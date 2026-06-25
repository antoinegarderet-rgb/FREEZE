import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

interface SignupParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  certifiedUnder30: boolean;
  referredByCode: string | null;
}

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signUp: (params: SignupParams) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<void> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      setProfile(null);
      return;
    }
    setProfile(data);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      if (data.session) {
        fetchProfile(data.session.user.id).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        fetchProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (params: SignupParams): Promise<void> => {
    if (params.referredByCode) {
      const { data: referrer, error: lookupError } = await supabase
        .from('profiles')
        .select('id')
        .eq('affiliate_code', params.referredByCode)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (!referrer) {
        throw new Error('Code parrain invalide.');
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          first_name: params.firstName,
          last_name: params.lastName,
          phone: params.phone,
          birth_date: params.birthDate,
          certified_under_30: params.certifiedUnder30,
          referred_by_code: params.referredByCode,
        },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error("La création du compte a échoué.");
    // Le profil est créé côté serveur par le trigger `handle_new_user`
    // (voir 0004_handle_new_user.sql), car signUp() ne renvoie pas de
    // session tant que l'email n'est pas confirmé.
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resendVerificationEmail = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    if (error) throw error;
  };

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'freeze://reset-password',
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  const refreshProfile = async (): Promise<void> => {
    if (!session) return;
    await fetchProfile(session.user.id);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      isLoading,
      signUp,
      signIn,
      signOut,
      resendVerificationEmail,
      sendPasswordResetEmail,
      updatePassword,
      refreshProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- functions are stable closures recreated intentionally each render
    [session, profile, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
  return ctx;
}

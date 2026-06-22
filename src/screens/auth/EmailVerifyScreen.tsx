import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'EmailVerify'>;

const RESEND_COOLDOWN_SECONDS = 60;

export function EmailVerifyScreen({ navigation, route }: Props): React.JSX.Element {
  const { email } = route.params;
  const { resendVerificationEmail } = useAuth();
  const { showToast } = useToast();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async (): Promise<void> => {
    if (cooldown > 0) return;
    try {
      await resendVerificationEmail(email);
      showToast('Email renvoyé ✓');
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Impossible de renvoyer l'email.";
      showToast(message, 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>📧</Text>
      </View>
      <Text style={styles.title}>Vérifie ton email</Text>
      <Text style={styles.description}>
        On t&apos;a envoyé un email à <Text style={styles.email}>{email}</Text>. Clique sur le lien
        pour activer ton compte FREEZE.
      </Text>
      <Button
        label={cooldown > 0 ? `Renvoyer dans ${cooldown}s…` : "Renvoyer l'email"}
        onPress={handleResend}
        disabled={cooldown > 0}
        variant="secondary"
        fullWidth
        style={styles.resendButton}
      />
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        J&apos;ai déjà confirmé, me connecter
      </Text>
      <Text style={styles.hint}>Tu peux fermer l&apos;app et revenir plus tard.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.blueXL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.t2,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 300,
    marginBottom: 30,
  },
  email: {
    fontWeight: '700',
    color: colors.text,
  },
  resendButton: {
    maxWidth: 320,
  },
  loginLink: {
    marginTop: 16,
    fontSize: 14,
    color: colors.blue,
    fontWeight: '700',
  },
  hint: {
    fontSize: 11,
    color: colors.t3,
    marginTop: 24,
    textAlign: 'center',
  },
});

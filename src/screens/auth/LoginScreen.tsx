import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { FreezeLogo } from '@/components/ui/FreezeLogo';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props): React.JSX.Element {
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Email ou mot de passe incorrect.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        onBack={() => navigation.navigate('Welcome')}
        rightAction={<FreezeLogo height={22} />}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Salut, content de te revoir 👋</Text>
        <Text style={styles.subtitle}>Connecte-toi pour retrouver tes offres FREEZE.</Text>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="ton@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<Text style={styles.icon}>✉️</Text>}
          />
          <InputField
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={error ?? undefined}
            icon={<Text style={styles.icon}>🔒</Text>}
            suffix={
              <Pressable onPress={() => setShowPassword((v) => !v)}>
                <Text style={styles.icon}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            }
          />
          <Text style={styles.forgotLink} onPress={() => navigation.navigate('ForgotPassword')}>
            Mot de passe oublié ?
          </Text>
        </View>

        <Button
          label="Se connecter"
          onPress={handleSubmit}
          fullWidth
          loading={loading}
          style={styles.submitButton}
        />

        <Text style={styles.footer}>
          Pas encore de compte ?{' '}
          <Text style={styles.footerLink} onPress={() => navigation.navigate('Signup')}>
            Créer un compte
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: 30,
  },
  title: {
    fontWeight: '900',
    fontSize: 28,
    color: colors.text,
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.t2,
    marginBottom: 24,
  },
  form: {
    gap: 14,
  },
  icon: {
    fontSize: 16,
  },
  forgotLink: {
    textAlign: 'right',
    fontSize: 13,
    color: colors.blue,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 22,
  },
  footer: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 13,
    color: colors.t2,
  },
  footerLink: {
    color: colors.blue,
    fontWeight: '700',
  },
});

import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

type Strength = 0 | 1 | 2 | 3;

function computeStrength(password: string): Strength {
  if (password.length >= 12) return 3;
  if (password.length >= 8) return 2;
  if (password.length >= 4) return 1;
  return 0;
}

const STRENGTH_COLORS = [colors.red, colors.amber, colors.green];
const STRENGTH_LABELS = ['Faible', 'Moyen', 'Fort'];

export function ResetPasswordScreen({ navigation }: Props): React.JSX.Element {
  const { updatePassword } = useAuth();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => computeStrength(password), [password]);
  const confirmError =
    confirmPassword && confirmPassword !== password
      ? 'Les mots de passe ne correspondent pas'
      : undefined;

  const handleSubmit = async (): Promise<void> => {
    if (password.length < 8 || confirmError) return;
    setLoading(true);
    try {
      await updatePassword(password);
      showToast('Mot de passe modifié ✓');
      navigation.navigate('Login');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Impossible de modifier le mot de passe.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Nouveau mot de passe" onBack={() => navigation.navigate('Login')} />
      <View style={styles.content}>
        <Text style={styles.description}>
          Choisis un nouveau mot de passe pour ton compte FREEZE.
        </Text>
        <View style={styles.form}>
          <InputField
            label="Nouveau mot de passe"
            placeholder="Min. 8 caractères"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={<Text style={styles.icon}>🔒</Text>}
            suffix={
              <Pressable onPress={() => setShowPassword((v) => !v)}>
                <Text style={styles.icon}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            }
          />
          {password.length > 0 && (
            <View>
              <View style={styles.strengthBars}>
                {[0, 1, 2].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      { backgroundColor: i < strength ? STRENGTH_COLORS[strength - 1] : colors.s3 },
                    ]}
                  />
                ))}
              </View>
              {strength > 0 && (
                <Text style={[styles.strengthLabel, { color: STRENGTH_COLORS[strength - 1] }]}>
                  {STRENGTH_LABELS[strength - 1]}
                </Text>
              )}
            </View>
          )}
          <InputField
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            error={confirmError}
            icon={<Text style={styles.icon}>🔒</Text>}
          />
        </View>
        <Button
          label="Enregistrer mon nouveau mot de passe"
          onPress={handleSubmit}
          fullWidth
          loading={loading}
          disabled={password.length < 8 || !!confirmError}
          style={styles.submitButton}
        />
      </View>
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
    paddingTop: 10,
  },
  description: {
    fontSize: 14,
    color: colors.t2,
    lineHeight: 21,
    marginBottom: 24,
  },
  form: {
    gap: 14,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 22,
  },
  icon: {
    fontSize: 16,
  },
});

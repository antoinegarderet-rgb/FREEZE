import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props): React.JSX.Element {
  const { sendPasswordResetEmail } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      showToast('Email envoyé ✓ Vérifie ta boîte de réception');
      navigation.navigate('Login');
    } catch (e) {
      const message = e instanceof Error ? e.message : "Impossible d'envoyer l'email.";
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Mot de passe oublié" onBack={() => navigation.navigate('Login')} />
      <View style={styles.content}>
        <Text style={styles.description}>
          Entre ton email, on t&apos;envoie un lien pour réinitialiser ton mot de passe.
        </Text>
        <InputField label="Email" placeholder="ton@email.com" value={email} onChangeText={setEmail} />
        <Button
          label="Envoyer le lien"
          onPress={handleSubmit}
          fullWidth
          loading={loading}
          style={styles.submitButton}
        />
        <Text style={styles.backLink} onPress={() => navigation.navigate('Login')}>
          Retour à la connexion
        </Text>
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
    gap: 14,
  },
  description: {
    fontSize: 14,
    color: colors.t2,
    lineHeight: 21,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 8,
  },
  backLink: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 13,
    color: colors.t2,
    fontWeight: '600',
  },
});

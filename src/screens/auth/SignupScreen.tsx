import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { Checkbox } from '@/components/ui/Checkbox';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

const INITIAL_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
};

function isValidBirthDate(value: string): boolean {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

function toIsoDate(frenchDate: string): string {
  const [day, month, year] = frenchDate.split('/');
  return `${year}-${month}-${day}`;
}

export function SignupScreen({ navigation }: Props): React.JSX.Element {
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [certifiesUnder30, setCertifiesUnder30] = useState(false);
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!form.firstName || !form.lastName) return 'Prénom et nom requis.';
    if (!form.email.includes('@')) return 'Email invalide.';
    if (!isValidBirthDate(form.birthDate)) return 'Date de naissance invalide (JJ/MM/AAAA).';
    if (form.password.length < 8) return 'Le mot de passe doit faire au moins 8 caractères.';
    if (form.password !== form.confirmPassword) return 'Les mots de passe ne correspondent pas.';
    return null;
  };

  const handleSubmit = async (): Promise<void> => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signUp({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        birthDate: toIsoDate(form.birthDate),
        certifiedUnder30: certifiesUnder30,
        referredByCode: form.referralCode ? form.referralCode.toUpperCase() : null,
      });
      navigation.navigate('EmailVerify', { email: form.email });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Une erreur est survenue.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Créer un compte" onBack={() => navigation.navigate('Welcome')} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Avant de te lancer, il nous faut quelques infos. Ça prend 30 secondes ⏱
        </Text>

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <InputField
              label="Prénom"
              placeholder="Antoine"
              value={form.firstName}
              onChangeText={(v) => update('firstName', v)}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.rowItem}>
            <InputField
              label="Nom"
              placeholder="Dupont"
              value={form.lastName}
              onChangeText={(v) => update('lastName', v)}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="ton@email.com"
            value={form.email}
            onChangeText={(v) => update('email', v)}
            keyboardType="email-address"
          />
          <InputField
            label="Numéro de téléphone"
            placeholder="6 12 34 56 78"
            value={form.phone}
            onChangeText={(v) => update('phone', v)}
            keyboardType="phone-pad"
          />
          <InputField
            label="Date de naissance"
            placeholder="JJ/MM/AAAA"
            value={form.birthDate}
            onChangeText={(v) => update('birthDate', v)}
          />
          <InputField
            label="Mot de passe"
            placeholder="Min. 8 caractères"
            value={form.password}
            onChangeText={(v) => update('password', v)}
            secureTextEntry
          />
          <InputField
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChangeText={(v) => update('confirmPassword', v)}
            secureTextEntry
            error={error ?? undefined}
          />
          <InputField
            label="Code parrain (optionnel)"
            placeholder="ABC123"
            value={form.referralCode}
            onChangeText={(v) => update('referralCode', v.toUpperCase())}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.ageBanner}>
          <Checkbox
            checked={certifiesUnder30}
            onChange={setCertifiesUnder30}
            label="Je certifie avoir moins de 30 ans. Les partenaires FREEZE peuvent demander une pièce d'identité pour vérifier mon éligibilité. J'accepte les Conditions d'utilisation et la Politique de confidentialité."
          />
        </View>

        <View style={styles.marketingCheckbox}>
          <Checkbox
            checked={acceptsMarketing}
            onChange={setAcceptsMarketing}
            label="Je veux recevoir les nouveaux spots et bons plans par email (1x/sem max)."
          />
        </View>

        <Button
          label="Créer mon compte →"
          onPress={handleSubmit}
          fullWidth
          disabled={!certifiesUnder30}
          loading={loading}
          variant={certifiesUnder30 ? 'primary' : 'locked'}
          style={styles.submitButton}
        />

        <Text style={styles.footer}>
          Déjà inscrit ?{' '}
          <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
            Se connecter
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
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 14,
    color: colors.t2,
    marginBottom: 18,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  rowItem: {
    flex: 1,
  },
  form: {
    gap: 12,
  },
  ageBanner: {
    marginTop: 18,
    backgroundColor: colors.blueXL,
    borderWidth: 1.5,
    borderColor: colors.borderM,
    borderRadius: 16,
    padding: 14,
  },
  marketingCheckbox: {
    marginTop: 14,
  },
  submitButton: {
    marginTop: 22,
  },
  footer: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 12,
    color: colors.t2,
  },
  footerLink: {
    color: colors.blue,
    fontWeight: '700',
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FreezeLogo } from '@/components/ui/FreezeLogo';
import { colors } from '@/constants/colors';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <LinearGradient colors={['#0E1166', colors.navy, colors.blue]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <FreezeLogo height={62} white style={styles.logo} />
          <Text style={styles.title}>
            La carte avantages{'\n'}des <Text style={styles.titleAccent}>-30 ans</Text>
          </Text>
          <Text style={styles.subtitle}>
            +300 partenaires restos, bars, sport, loisirs, beauté, etc.{'\n'}Rentabilisé dès la
            1ère visite.
          </Text>
        </View>

        <View style={styles.ctas}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.primaryButtonLabel}>Créer un compte</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryButtonLabel}>Se connecter</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 32,
  },
  title: {
    fontWeight: '800',
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.8,
    marginBottom: 14,
  },
  titleAccent: {
    color: '#A5BBFF',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  ctas: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 17,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  secondaryButton: {
    paddingVertical: 17,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  secondaryButtonLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

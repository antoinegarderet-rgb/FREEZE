import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { FreezeCard } from '@/components/ui/FreezeCard';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function SubscribedScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();

  return (
    <LinearGradient colors={[colors.navyD, colors.navy, '#2B52F0']} style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Bienvenue dans FREEZE !</Text>
          <Text style={styles.subtitle}>
            Ton abonnement est actif. Tu peux maintenant profiter de toutes les offres exclusives.
          </Text>
          <View style={styles.cardWrap}>
            <FreezeCard name="Antoine G." />
          </View>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+200</Text>
              <Text style={styles.statLabel}>Partenaires</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127€</Text>
              <Text style={styles.statLabel}>Économie moy.</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4€</Text>
              <Text style={styles.statLabel}>Par parrainage</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Pressable style={styles.ctaBtn} onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.ctaBtnText}>Découvrir les offres 🚀</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 12 },
  emoji: { fontSize: 48 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 22 },
  cardWrap: { marginVertical: 16 },
  stats: { flexDirection: 'row', gap: 0 },
  statItem: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  statValue: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  bottom: { paddingHorizontal: 24, paddingBottom: 24, gap: 10 },
  ctaBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaBtnText: { color: colors.navy, fontSize: 16, fontWeight: '800' },
});

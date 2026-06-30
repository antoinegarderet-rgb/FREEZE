import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const HISTORY = [
  { partner: "McDonald's", date: "Aujourd'hui", saving: '3€', icon: '🍟' },
  { partner: 'Theory Bar', date: 'Hier', saving: '10€', icon: '🍸' },
  { partner: 'SwedishFit', date: 'Lundi', saving: '15€', icon: '💪' },
  { partner: "O'Tacos", date: 'Dimanche', saving: '3€', icon: '🌯' },
];

export function SavingsScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mes économies</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroBox}>
          <Text style={styles.heroAmount}>127€</Text>
          <Text style={styles.heroLabel}>économisés au total</Text>
        </View>
        <View style={styles.row2}>
          <View style={styles.miniCard}>
            <Text style={styles.miniValue}>38</Text>
            <Text style={styles.miniLabel}>Offres utilisées</Text>
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniValue}>12×</Text>
            <Text style={styles.miniLabel}>Carte rentabilisée</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Dernières économies</Text>
        {HISTORY.map((h, i) => (
          <View key={i} style={styles.historyRow}>
            <View style={styles.historyIcon}><Text style={styles.historyEmoji}>{h.icon}</Text></View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyPartner}>{h.partner}</Text>
              <Text style={styles.historyDate}>{h.date}</Text>
            </View>
            <Text style={styles.historySaving}>-{h.saving}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, color: colors.text },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  scroll: { padding: 20, gap: 12 },
  heroBox: { backgroundColor: colors.navy, borderRadius: 20, padding: 28, alignItems: 'center', marginBottom: 4 },
  heroAmount: { fontSize: 52, fontWeight: '900', color: '#FFFFFF' },
  heroLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  row2: { flexDirection: 'row', gap: 12 },
  miniCard: { flex: 1, backgroundColor: colors.s1, borderRadius: 16, padding: 16, alignItems: 'center' },
  miniValue: { fontSize: 28, fontWeight: '900', color: colors.navy },
  miniLabel: { fontSize: 12, color: colors.t2, marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: 8 },
  historyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.s1, borderRadius: 14, padding: 14, gap: 12 },
  historyIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.s2, alignItems: 'center', justifyContent: 'center' },
  historyEmoji: { fontSize: 22 },
  historyInfo: { flex: 1 },
  historyPartner: { fontSize: 15, fontWeight: '700', color: colors.text },
  historyDate: { fontSize: 12, color: colors.t2 },
  historySaving: { fontSize: 16, fontWeight: '800', color: colors.greenD },
});

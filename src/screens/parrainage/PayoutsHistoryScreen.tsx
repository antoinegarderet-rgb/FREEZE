import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const PAYOUTS = [
  { date: '12 juin 2025', amount: '12€', status: 'versé', filleuls: 3 },
  { date: '1 mai 2025', amount: '8€', status: 'versé', filleuls: 2 },
  { date: '15 avril 2025', amount: '4€', status: 'versé', filleuls: 1 },
];

export function PayoutsHistoryScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Historique des versements</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {PAYOUTS.map((p, i) => (
          <Pressable key={i} style={styles.card} onPress={() => navigation.navigate('PayoutDetail')}>
            <View style={styles.iconBox}><Text style={styles.icon}>💸</Text></View>
            <View style={styles.info}>
              <Text style={styles.amount}>{p.amount}</Text>
              <Text style={styles.detail}>{p.filleuls} filleul{p.filleuls > 1 ? 's' : ''} • {p.date}</Text>
            </View>
            <View style={styles.chip}><Text style={styles.chipText}>{p.status}</Text></View>
          </Pressable>
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
  title: { fontSize: 16, fontWeight: '800', color: colors.text },
  scroll: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.s1, borderRadius: 14, padding: 14, gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.greenBg, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22 },
  info: { flex: 1 },
  amount: { fontSize: 18, fontWeight: '900', color: colors.text },
  detail: { fontSize: 12, color: colors.t2, marginTop: 2 },
  chip: { backgroundColor: colors.greenBg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  chipText: { color: colors.greenD, fontSize: 12, fontWeight: '700' },
});

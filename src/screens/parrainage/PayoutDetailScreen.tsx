import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function PayoutDetailScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Détail du versement</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant versé</Text>
          <Text style={styles.amount}>12€</Text>
          <Text style={styles.date}>12 juin 2025</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.rowLabel}>Filleuls</Text><Text style={styles.rowValue}>3</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Taux</Text><Text style={styles.rowValue}>4€ / filleul</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>IBAN</Text><Text style={styles.rowValue}>FR76 ****</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Statut</Text><Text style={[styles.rowValue, { color: colors.greenD }]}>Versé</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, color: colors.text },
  title: { fontSize: 16, fontWeight: '800', color: colors.text },
  content: { padding: 16, gap: 12 },
  amountCard: { backgroundColor: colors.navy, borderRadius: 20, padding: 24, alignItems: 'center' },
  amountLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  amount: { color: '#FFFFFF', fontSize: 48, fontWeight: '900', marginVertical: 4 },
  date: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  card: { backgroundColor: colors.s1, borderRadius: 16, padding: 16, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { fontSize: 14, color: colors.t2 },
  rowValue: { fontSize: 14, fontWeight: '700', color: colors.text },
});

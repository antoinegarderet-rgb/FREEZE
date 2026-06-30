import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function SubscriptionScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mon abonnement</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.activeChip}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Abonnement actif</Text>
          </View>
          <Text style={styles.planName}>FREEZE Annuel</Text>
          <Text style={styles.planPrice}>25€ / an</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Renouvellement</Text>
            <Text style={styles.rowValue}>31 août 2025</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mode de paiement</Text>
            <Text style={styles.rowValue}>Carte bancaire</Text>
          </View>
        </View>
        <Pressable style={styles.cancelBtn} onPress={() => navigation.navigate('CancelSubscription')}>
          <Text style={styles.cancelText}>Annuler mon abonnement</Text>
        </Pressable>
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
  scroll: { padding: 16, gap: 16 },
  card: { backgroundColor: colors.s1, borderRadius: 20, padding: 20, gap: 8 },
  activeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.greenBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6, alignSelf: 'flex-start', marginBottom: 4 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.green },
  activeText: { color: colors.greenD, fontSize: 13, fontWeight: '700' },
  planName: { fontSize: 22, fontWeight: '900', color: colors.text },
  planPrice: { fontSize: 16, color: colors.t2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { fontSize: 14, color: colors.t2 },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  cancelBtn: { backgroundColor: '#FFF0F0', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  cancelText: { color: '#E53E3E', fontSize: 15, fontWeight: '700' },
});

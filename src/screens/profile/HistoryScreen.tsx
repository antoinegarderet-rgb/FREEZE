import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const HISTORY = [
  { partner: "McDonald's", date: "Aujourd'hui", saving: '3€', icon: '🍟', offer: '-20% sur ta commande' },
  { partner: 'Theory Bar', date: 'Hier', saving: '10€', icon: '🍸', offer: '1 cocktail offert dès 2 achetés' },
  { partner: 'SwedishFit', date: 'Lundi', saving: '15€', icon: '💪', offer: '-30% sur abonnement mensuel' },
  { partner: "O'Tacos", date: 'Dimanche', saving: '3€', icon: '🌯', offer: '-10% sur ta commande' },
];

export function HistoryScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Historique</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {HISTORY.map((h, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.iconBox}><Text style={styles.iconEmoji}>{h.icon}</Text></View>
            <View style={styles.info}>
              <Text style={styles.partner}>{h.partner}</Text>
              <Text style={styles.offer}>{h.offer}</Text>
              <Text style={styles.date}>{h.date}</Text>
            </View>
            <Text style={styles.saving}>-{h.saving}</Text>
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
  scroll: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.s1, borderRadius: 16, padding: 14, gap: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.s2, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 24 },
  info: { flex: 1 },
  partner: { fontSize: 15, fontWeight: '700', color: colors.text },
  offer: { fontSize: 12, color: colors.t2, marginTop: 2 },
  date: { fontSize: 11, color: colors.t3, marginTop: 2 },
  saving: { fontSize: 16, fontWeight: '800', color: colors.greenD },
});

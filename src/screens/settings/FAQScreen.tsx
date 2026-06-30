import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const FAQS = [
  { q: 'Comment fonctionne FREEZE ?', a: 'FREEZE est une carte de réductions pour les moins de 30 ans à Paris. Présente ta carte chez nos partenaires pour profiter de remises exclusives.' },
  { q: 'Comment utiliser ma carte ?', a: "Présente ta carte sur ton téléphone à la caisse du partenaire. Tu peux aussi scanner le QR code du partenaire depuis l'app." },
  { q: 'La carte est-elle nominative ?', a: 'Oui, ta carte est strictement personnelle et nominative. Elle ne peut pas être partagée.' },
  { q: 'Comment fonctionne le parrainage ?', a: 'Partage ton code parrain avec tes amis. Dès qu\'ils s\'abonnent avec ton code, tu gagnes 4€ reversés sur ton compte FREEZE.' },
  { q: 'Comment annuler mon abonnement ?', a: 'Tu peux annuler à tout moment depuis Paramètres > Mon abonnement. Aucun engagement.' },
  { q: 'Comment contacter le support ?', a: 'Envoie-nous un message depuis Paramètres > Nous contacter. On répond en moins de 24h.' },
];

export function FAQScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>FAQ</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {FAQS.map((faq, i) => (
          <Pressable key={i} style={styles.card} onPress={() => setOpen(open === i ? null : i)}>
            <View style={styles.row}>
              <Text style={styles.question}>{faq.q}</Text>
              <Text style={styles.chevron}>{open === i ? '▲' : '▼'}</Text>
            </View>
            {open === i && <Text style={styles.answer}>{faq.a}</Text>}
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
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  scroll: { padding: 16, gap: 8 },
  card: { backgroundColor: colors.s1, borderRadius: 14, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  question: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.text },
  chevron: { fontSize: 12, color: colors.t3 },
  answer: { fontSize: 14, color: colors.t2, lineHeight: 20, marginTop: 10 },
});

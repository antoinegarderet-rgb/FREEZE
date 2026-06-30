import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { FreezeCard } from '@/components/ui/FreezeCard';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const BENEFITS = [
  { icon: '🏷️', text: '+200 offres exclusives à Paris' },
  { icon: '💰', text: 'Économise en moyenne 127€/an' },
  { icon: '🎁', text: 'Programme parrainage : gagne 4€/ami' },
  { icon: '🔓', text: 'Accès immédiat dès la souscription' },
  { icon: '❌', text: 'Annulable à tout moment' },
];

const FAQS = [
  { q: 'Comment fonctionne FREEZE ?', a: 'FREEZE est une carte de réductions pour les moins de 30 ans à Paris. Présente ta carte chez nos partenaires pour profiter de remises exclusives.' },
  { q: 'Comment annuler mon abonnement ?', a: 'Tu peux annuler à tout moment depuis ton espace profil > Paramètres > Abonnement. Aucun engagement.' },
  { q: 'Ma carte est-elle nominative ?', a: 'Oui, ta carte est strictement personnelle et nominative. Elle ne peut pas être partagée.' },
];

export function PaywallScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.navy, colors.navyD, '#000832']} style={styles.hero}>
          <SafeAreaView edges={['top']}>
            <View style={styles.heroHeader}>
              <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.closeBtnText}>←</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Tabs')}>
                <Text style={styles.skipText}>Plus tard</Text>
              </Pressable>
            </View>
          </SafeAreaView>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Débloque toutes{'\n'}les offres FREEZE</Text>
            <Text style={styles.heroSub}>+200 partenaires · Paris · -18/30 ans</Text>
            <View style={styles.cardHalo}>
              <FreezeCard name="Antoine G." />
            </View>
          </View>
        </LinearGradient>

        {/* Plan selector */}
        <View style={styles.planSection}>
          <Text style={styles.planTitle}>Choisir ton offre</Text>
          <View style={styles.planCards}>
            <Pressable
              style={[styles.planCard, plan === 'annual' && styles.planCardActive]}
              onPress={() => setPlan('annual')}
            >
              <View style={styles.planCardTop}>
                <Text style={[styles.planName, plan === 'annual' && styles.planNameActive]}>Annuel</Text>
                <View style={styles.saveBadge}><Text style={styles.saveBadgeText}>-17%</Text></View>
              </View>
              <Text style={[styles.planPrice, plan === 'annual' && styles.planPriceActive]}>25€</Text>
              <Text style={[styles.planPer, plan === 'annual' && styles.planPerActive]}>par an · 2,08€/mois</Text>
            </Pressable>
            <Pressable
              style={[styles.planCard, plan === 'monthly' && styles.planCardActive]}
              onPress={() => setPlan('monthly')}
            >
              <Text style={[styles.planName, plan === 'monthly' && styles.planNameActive]}>Mensuel</Text>
              <Text style={[styles.planPrice, plan === 'monthly' && styles.planPriceActive]}>2,50€</Text>
              <Text style={[styles.planPer, plan === 'monthly' && styles.planPerActive]}>par mois</Text>
            </Pressable>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Inclus dans FREEZE</Text>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          {FAQS.map((f, i) => (
            <View key={i}>
              <Pressable style={styles.faqQ} onPress={() => setOpenFaq(openFaq === i ? null : i)}>
                <Text style={styles.faqQText}>{f.q}</Text>
                <Text style={styles.faqChevron}>{openFaq === i ? '▲' : '▼'}</Text>
              </Pressable>
              {openFaq === i && (
                <View style={styles.faqA}>
                  <Text style={styles.faqAText}>{f.a}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <SafeAreaView style={styles.ctaWrap} edges={['bottom']}>
        <Pressable style={styles.ctaBtn} onPress={() => navigation.navigate('Subscribed')}>
          <Text style={styles.ctaBtnText}>
            {plan === 'annual' ? 'Commencer pour 25€/an' : 'Commencer pour 2,50€/mois'}
          </Text>
        </Pressable>
        <Text style={styles.ctaHint}>Annulable à tout moment · Paiement sécurisé</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 20 },
  hero: { paddingBottom: 32 },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  skipText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  heroContent: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 8, gap: 8 },
  heroTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', textAlign: 'center', lineHeight: 36 },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, textAlign: 'center', marginBottom: 16 },
  cardHalo: {
    padding: 20,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  planSection: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  planTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 14 },
  planCards: { flexDirection: 'row', gap: 12 },
  planCard: {
    flex: 1,
    backgroundColor: colors.s1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
    gap: 4,
  },
  planCardActive: { borderColor: colors.navy, backgroundColor: colors.blueXL },
  planCardTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  planName: { fontSize: 14, fontWeight: '700', color: colors.t2 },
  planNameActive: { color: colors.navy },
  saveBadge: {
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  saveBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  planPrice: { fontSize: 28, fontWeight: '900', color: colors.text },
  planPriceActive: { color: colors.navy },
  planPer: { fontSize: 11, color: colors.t3 },
  planPerActive: { color: colors.t2 },
  benefitsSection: {
    backgroundColor: colors.s1,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    gap: 12,
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  benefitIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  benefitText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
  faqSection: {
    backgroundColor: colors.s1,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
  },
  faqQ: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqQText: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text },
  faqChevron: { color: colors.t2, fontSize: 11, marginLeft: 8 },
  faqA: { paddingVertical: 10, paddingBottom: 4 },
  faqAText: { fontSize: 13, color: colors.t2, lineHeight: 18 },
  ctaWrap: {
    backgroundColor: colors.s1,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 6,
    paddingBottom: 8,
  },
  ctaBtn: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  ctaHint: { textAlign: 'center', fontSize: 11, color: colors.t3 },
});

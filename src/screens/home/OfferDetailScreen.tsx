import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { PartnerLogo } from '@/components/ui/PartnerLogo';
import { OFFERS } from '@/data/offers';
import type { MainStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'OfferDetail'>;
type Nav = NativeStackNavigationProp<MainStackParamList>;

export function OfferDetailScreen({ route }: Props): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { offerId } = route.params;
  const offer = OFFERS.find((o) => o.id === offerId);
  const [isFav, setIsFav] = useState(false);

  if (!offer) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Offre introuvable</Text>
      </SafeAreaView>
    );
  }

  const isOnline = offer.cat === 'online';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero area */}
        <View style={styles.hero}>
          <LinearGradient colors={[offer.bg, offer.bg2]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />
          <View style={styles.logoBadge}>
            <PartnerLogo logo={offer.logo} name={offer.name} initial={offer.initial} bg={offer.bg} size={80} radius={20} />
          </View>
          <Text style={styles.heroName}>{offer.name}</Text>
          <View style={styles.heroMeta}>
            {offer.tag ? <View style={styles.tagChip}><Text style={styles.tagText}>{offer.tag}</Text></View> : null}
            {offer.distance ? <View style={styles.distChip}><Text style={styles.distText}>📍 {offer.distance}</Text></View> : null}
          </View>
        </View>

        {/* Savings card */}
        <View style={styles.savingsCard}>
          <Text style={styles.savingsIcon}>💰</Text>
          <View>
            <Text style={styles.savingsLabel}>Économie estimée</Text>
            <Text style={styles.savingsValue}>{offer.saving}</Text>
          </View>
        </View>

        {/* Offer card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>L'offre FREEZE</Text>
          <View style={styles.offerHighlight}>
            <Text style={styles.offerHighlightText}>{offer.emoji} {offer.offer}</Text>
          </View>
        </View>

        {/* Online code */}
        {isOnline && offer.code ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Code promo</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{offer.code}</Text>
              <Pressable style={styles.copyBtn}>
                <Text style={styles.copyBtnText}>Copier</Text>
              </Pressable>
            </View>
            <Text style={styles.codeHint}>Utilise ce code lors de ta commande sur le site</Text>
          </View>
        ) : null}

        {/* Conditions card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Conditions</Text>
          <View style={styles.conditionsList}>
            {['Valable sur présentation de ta carte FREEZE', 'Non cumulable avec d\'autres promotions', 'Réservé aux membres actifs', 'Dans la limite des stocks disponibles'].map((c, i) => (
              <View key={i} style={styles.conditionItem}>
                <Text style={styles.conditionDot}>•</Text>
                <Text style={styles.conditionText}>{c}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Address card for non-online */}
        {!isOnline && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Adresse</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressIcon}>📍</Text>
              <View>
                <Text style={styles.addressText}>Paris, France</Text>
                <Text style={styles.addressSub}>{offer.distance} depuis ta position</Text>
              </View>
            </View>
          </View>
        )}

        {/* Report button */}
        <Pressable style={styles.reportBtn}>
          <Text style={styles.reportText}>⚠️ Signaler un problème</Text>
        </Pressable>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Header overlay */}
      <SafeAreaView style={styles.headerOverlay} edges={['top']} pointerEvents="box-none">
        <View style={styles.headerRow}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.headerBtnText}>←</Text>
          </Pressable>
          <Pressable style={styles.headerBtn} onPress={() => setIsFav((f) => !f)}>
            <Text style={styles.headerBtnText}>{isFav ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Bottom CTA */}
      <View style={styles.bottomCta}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() => navigation.navigate('Scanner', { scanContext: 'generic', prevScreen: 'OfferDetail' })}
        >
          <Text style={styles.ctaBtnText}>Utiliser cette offre</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingBottom: 32,
  },
  hero: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    gap: 8,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.2,
  },
  heroName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  tagChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  distChip: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  distText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  savingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenBg,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,196,110,0.2)',
  },
  savingsIcon: {
    fontSize: 28,
  },
  savingsLabel: {
    fontSize: 12,
    color: colors.greenD,
    fontWeight: '600',
  },
  savingsValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.greenD,
  },
  card: {
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
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.t2,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  offerHighlight: {
    backgroundColor: colors.blueXL,
    borderRadius: 12,
    padding: 14,
  },
  offerHighlightText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.navy,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.s2,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.navy,
    letterSpacing: 2,
  },
  copyBtn: {
    backgroundColor: colors.navy,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  copyBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  codeHint: {
    fontSize: 12,
    color: colors.t2,
  },
  conditionsList: {
    gap: 6,
  },
  conditionItem: {
    flexDirection: 'row',
    gap: 8,
  },
  conditionDot: {
    color: colors.t3,
    fontSize: 14,
  },
  conditionText: {
    flex: 1,
    fontSize: 14,
    color: colors.t2,
    lineHeight: 20,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  addressIcon: {
    fontSize: 20,
  },
  addressText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  addressSub: {
    fontSize: 12,
    color: colors.t2,
    marginTop: 2,
  },
  reportBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  reportText: {
    color: colors.t3,
    fontSize: 13,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.s1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  ctaBtn: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  notFound: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: colors.t2,
  },
});

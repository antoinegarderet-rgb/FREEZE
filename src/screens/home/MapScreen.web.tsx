// Web fallback — react-native-maps is native-only
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/constants/theme';
import { PartnerLogo } from '@/components/ui/PartnerLogo';
import { CATEGORIES, OFFERS } from '@/data/offers';
import type { MainStackParamList } from '@/types/navigation';
import type { OfferCategory } from '@/data/offers';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function MapScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [selectedCat, setSelectedCat] = useState<OfferCategory>('all');

  const filtered = OFFERS.filter(
    (o) => o.distance !== null && (selectedCat === 'all' || o.cat === selectedCat)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Carte</Text>
        <Text style={styles.subtitle}>Partenaires à proximité</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
        {CATEGORIES.filter((c) => c.id !== 'online').map((cat) => {
          const active = selectedCat === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[styles.chip, active && { backgroundColor: colors.navy, borderColor: colors.navy }]}
              onPress={() => setSelectedCat(cat.id as OfferCategory)}
            >
              <Text style={styles.chipEmoji}>{cat.emoji}</Text>
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{cat.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((offer) => (
          <Pressable
            key={offer.id}
            style={styles.row}
            onPress={() => navigation.navigate('OfferDetail', { offerId: offer.id })}
          >
            <PartnerLogo logo={offer.logo} name={offer.name} initial={offer.initial} bg={offer.bg} size={48} radius={12} />
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{offer.name}</Text>
              <Text style={styles.rowOffer} numberOfLines={1}>{offer.offer}</Text>
            </View>
            {offer.distance ? <Text style={styles.rowDist}>{offer.distance}</Text> : null}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontFamily: fonts.extraBold, fontSize: 24, color: colors.text },
  subtitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.t2, marginTop: 2 },
  catScroll: { marginBottom: 4 },
  catContent: { paddingHorizontal: 16, gap: 8, paddingVertical: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.s1, borderRadius: 100,
    paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1, borderColor: colors.border,
  },
  chipEmoji: { fontSize: 13 },
  chipLabel: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t2 },
  chipLabelActive: { color: '#FFFFFF' },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 8 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.s1, borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  rowText: { flex: 1, gap: 2 },
  rowName: { fontSize: 15, fontFamily: fonts.extraBold, color: colors.text },
  rowOffer: { fontSize: 13, fontFamily: fonts.medium, color: colors.t2 },
  rowDist: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t3 },
});

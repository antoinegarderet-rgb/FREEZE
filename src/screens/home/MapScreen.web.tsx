// Web fallback — react-native-maps is native-only
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/constants/theme';
import { CAT_ICONS, CATEGORIES } from '@/constants/categories';
import { MAP_PARTNERS } from '@/data/mapPartners';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function MapScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MAP_PARTNERS.filter((p) => {
    const catMatch = activeCat === 'all' || p.cat === activeCat;
    const q = search.toLowerCase();
    const searchMatch = q === '' || p.name.toLowerCase().includes(q) || p.offer.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un partenaire…"
            placeholderTextColor={colors.t3}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 ? (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContent}>
        {CATEGORIES.map((cat) => {
          const active = activeCat === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setActiveCat(cat.id)}
            >
              <Text style={styles.chipEmoji}>{cat.emoji}</Text>
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{cat.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((p) => (
          <Pressable
            key={p.id}
            style={styles.row}
            onPress={() => navigation.navigate('OfferDetail', { offerId: p.id, from: 'map' })}
          >
            <View style={[styles.rowLogo, { backgroundColor: p.bg }]}>
              <Text style={[styles.rowLogoText, { fontSize: p.initial.length <= 2 ? 18 : 12 }]}>{p.initial}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{p.name}</Text>
              <Text style={styles.rowOffer} numberOfLines={1}>{p.offer}</Text>
              <View style={styles.rowBadges}>
                <View style={styles.badgeSaving}>
                  <Text style={styles.badgeSavingText}>{p.saving}</Text>
                </View>
                <Text style={styles.rowCat}>{CAT_ICONS[p.cat]}</Text>
              </View>
            </View>
            <Text style={styles.rowDist}>{p.dist}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.s2,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    height: 44,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontFamily: fonts.medium, fontSize: 14, color: colors.text, padding: 0 },
  clearBtn: { fontSize: 14, color: colors.t3, paddingHorizontal: 4 },
  chipsContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5, height: 34,
    paddingHorizontal: 8, paddingVertical: 6, borderRadius: 100,
    backgroundColor: colors.s2, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipEmoji: { fontSize: 13 },
  chipLabel: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  chipLabelActive: { color: '#FFFFFF' },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 8 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.s1, borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  rowLogo: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  rowLogoText: { fontFamily: fonts.extraBold, color: '#FFFFFF' },
  rowText: { flex: 1, gap: 4 },
  rowName: { fontSize: 15, fontFamily: fonts.extraBold, color: colors.text },
  rowOffer: { fontSize: 13, fontFamily: fonts.medium, color: colors.t2 },
  rowBadges: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badgeSaving: { backgroundColor: colors.greenBg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeSavingText: { fontFamily: fonts.bold, fontSize: 11, color: colors.greenD },
  rowCat: { fontSize: 14 },
  rowDist: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t3 },
});

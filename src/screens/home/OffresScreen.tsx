import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { FreezeLogo } from '@/components/ui/FreezeLogo';
import { OfferCard } from '@/components/ui/OfferCard';
import { PartnerLogo } from '@/components/ui/PartnerLogo';
import { CATEGORIES, OFFERS } from '@/data/offers';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const MARQUEE_OFFERS = OFFERS.filter((o) => o.logo !== null).slice(0, 10);
const LOGO_WIDTH = 56;
const LOGO_GAP = 12;
const LOGO_ITEM_WIDTH = LOGO_WIDTH + LOGO_GAP;
const MARQUEE_TOTAL = MARQUEE_OFFERS.length * LOGO_ITEM_WIDTH;

export function OffresScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [selectedCat, setSelectedCat] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const marqueeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(marqueeX, {
        toValue: -MARQUEE_TOTAL,
        duration: MARQUEE_TOTAL * 30,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [marqueeX]);

  const filtered = OFFERS.filter((o) => {
    const matchCat = selectedCat === 'all' || o.cat === selectedCat;
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.offer.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const toggleFav = (id: number): void => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <FreezeLogo height={28} />
        <View style={styles.headerRight}>
          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Actif</Text>
          </View>
          <Pressable style={styles.iconBtn} onPress={() => setShowSearch((s) => !s)}>
            <Text style={styles.iconBtnText}>🔍</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {/* Search bar */}
            {showSearch && (
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher un partenaire..."
                  placeholderTextColor={colors.t3}
                  value={search}
                  onChangeText={setSearch}
                  autoFocus
                />
              </View>
            )}

            {/* Marquee strip */}
            <View style={styles.marqueeContainer}>
              <Animated.View style={[styles.marqueeTrack, { transform: [{ translateX: marqueeX }] }]}>
                {[...MARQUEE_OFFERS, ...MARQUEE_OFFERS, ...MARQUEE_OFFERS].map((o, i) => (
                  <View key={`${o.id}-${i}`} style={styles.marqueeItem}>
                    <PartnerLogo logo={o.logo} name={o.name} initial={o.initial} bg={o.bg} size={LOGO_WIDTH} radius={16} />
                  </View>
                ))}
              </Animated.View>
            </View>

            {/* Section title */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Toutes les offres</Text>
              <Text style={styles.sectionCount}>{filtered.length} partenaires</Text>
            </View>

            {/* Category pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
              {CATEGORIES.map((cat) => {
                const active = selectedCat === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    style={[styles.catPill, active && { backgroundColor: cat.color, borderColor: cat.color }]}
                    onPress={() => setSelectedCat(cat.id)}
                  >
                    <Text style={styles.catEmoji}>{cat.emoji}</Text>
                    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{cat.label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <OfferCard
            offer={item}
            onPress={() => navigation.navigate('OfferDetail', { offerId: item.id })}
            onFavorite={() => toggleFav(item.id)}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Aucune offre trouvée</Text>
            <Text style={styles.emptyText}>Essaie une autre catégorie ou recherche</Text>
          </View>
        }
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    backgroundColor: colors.s1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  activeText: {
    color: colors.greenD,
    fontSize: 12,
    fontWeight: '700',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.s2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    fontSize: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.s1,
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  marqueeContainer: {
    height: 72,
    overflow: 'hidden',
    marginBottom: 4,
  },
  marqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeItem: {
    marginRight: LOGO_GAP,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  sectionCount: {
    fontSize: 13,
    color: colors.t2,
  },
  catScroll: {
    marginBottom: 10,
  },
  catContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.s1,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5,
  },
  catEmoji: {
    fontSize: 14,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.t2,
  },
  catLabelActive: {
    color: '#FFFFFF',
  },
  list: {
    paddingBottom: 24,
  },
  row: {
    paddingHorizontal: 10,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.t2,
  },
});

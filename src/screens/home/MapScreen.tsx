import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/constants/theme';
import { PartnerLogo } from '@/components/ui/PartnerLogo';
import { CATEGORIES, OFFERS } from '@/data/offers';
import type { MainStackParamList } from '@/types/navigation';
import type { OfferCategory } from '@/data/offers';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const PARIS: Region = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

// Approximate coordinates per offer id (Paris neighbourhoods)
const COORDS: Record<number, { latitude: number; longitude: number }> = {
  1:  { latitude: 48.869, longitude: 2.349 },
  2:  { latitude: 48.862, longitude: 2.341 },
  3:  { latitude: 48.875, longitude: 2.352 },
  4:  { latitude: 48.858, longitude: 2.362 },
  5:  { latitude: 48.844, longitude: 2.358 },
  6:  { latitude: 48.871, longitude: 2.345 },
  7:  { latitude: 48.880, longitude: 2.338 },
  8:  { latitude: 48.852, longitude: 2.369 },
  9:  { latitude: 48.867, longitude: 2.343 },
  10: { latitude: 48.849, longitude: 2.354 },
  11: { latitude: 48.877, longitude: 2.357 },
  12: { latitude: 48.856, longitude: 2.331 },
  13: { latitude: 48.861, longitude: 2.325 },
  14: { latitude: 48.843, longitude: 2.347 },
  15: { latitude: 48.872, longitude: 2.360 },
  16: { latitude: 48.891, longitude: 2.291 },
  17: { latitude: 48.854, longitude: 2.285 },
  18: { latitude: 48.882, longitude: 2.372 },
  19: { latitude: 48.836, longitude: 2.361 },
  20: { latitude: 48.899, longitude: 2.302 },
  21: { latitude: 48.863, longitude: 2.337 },
  22: { latitude: 48.869, longitude: 2.331 },
  23: { latitude: 48.841, longitude: 2.345 },
  24: { latitude: 48.875, longitude: 2.329 },
  25: { latitude: 48.848, longitude: 2.372 },
};

const CAT_PIN_COLOR: Record<OfferCategory, string> = {
  all:      colors.navy,
  resto:    '#DA291C',
  bars:     colors.purple,
  sport:    colors.green,
  beauty:   '#DB2777',
  loisirs:  colors.amber,
  shopping: '#0891B2',
  online:   colors.purple,
};

const FILTER_CATS = CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'online');

export function MapScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [selectedCat, setSelectedCat] = useState<OfferCategory>('all');
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const sheetAnim = useRef(new Animated.Value(0)).current;

  const filtered = OFFERS.filter((o) =>
    o.distance !== null && (selectedCat === 'all' || o.cat === selectedCat)
  );

  const openSheet = (id: number): void => {
    setSelectedOffer(id);
    Animated.spring(sheetAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 10 }).start();
  };

  const closeSheet = (): void => {
    Animated.timing(sheetAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
      setSelectedOffer(null)
    );
  };

  const selected = OFFERS.find((o) => o.id === selectedOffer);

  const sheetTranslate = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      {/* Filter chips + toggle row */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Pressable
              style={[styles.chip, selectedCat === 'all' && styles.chipActive]}
              onPress={() => setSelectedCat('all')}
            >
              <Text style={styles.chipEmoji}>⚡</Text>
              <Text style={[styles.chipLabel, selectedCat === 'all' && styles.chipLabelActive]}>Tout</Text>
            </Pressable>
            {FILTER_CATS.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.chip, selectedCat === cat.id && { backgroundColor: cat.color, borderColor: cat.color }]}
                onPress={() => setSelectedCat(cat.id as OfferCategory)}
              >
                <Text style={styles.chipEmoji}>{cat.emoji}</Text>
                <Text style={[styles.chipLabel, selectedCat === cat.id && styles.chipLabelActive]}>
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.toggleBtn} onPress={() => setViewMode((m) => (m === 'map' ? 'list' : 'map'))}>
            <Text style={styles.toggleBtnText}>{viewMode === 'map' ? '☰' : '🗺'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {viewMode === 'map' ? (
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={PARIS}
          showsUserLocation
          onPress={closeSheet}
        >
          {filtered.map((offer) => {
            const coord = COORDS[offer.id];
            if (!coord) return null;
            return (
              <Marker
                key={offer.id}
                coordinate={coord}
                onPress={() => openSheet(offer.id)}
                pinColor={CAT_PIN_COLOR[offer.cat]}
              />
            );
          })}
        </MapView>
      ) : (
        <ScrollView style={styles.listView} contentContainerStyle={styles.listContent}>
          {filtered.map((offer) => (
            <Pressable
              key={offer.id}
              style={styles.listRow}
              onPress={() => navigation.navigate('OfferDetail', { offerId: offer.id })}
            >
              <PartnerLogo logo={offer.logo} name={offer.name} initial={offer.initial} bg={offer.bg} size={48} radius={12} />
              <View style={styles.listRowText}>
                <Text style={styles.listRowName}>{offer.name}</Text>
                <Text style={styles.listRowOffer} numberOfLines={1}>{offer.offer}</Text>
              </View>
              {offer.distance ? (
                <Text style={styles.listRowDist}>{offer.distance}</Text>
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Bottom sheet */}
      {selected ? (
        <Animated.View style={[styles.sheet, { transform: [{ translateY: sheetTranslate }] }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetRow}>
            <PartnerLogo
              logo={selected.logo}
              name={selected.name}
              initial={selected.initial}
              bg={selected.bg}
              size={52}
              radius={14}
            />
            <View style={styles.sheetInfo}>
              <Text style={styles.sheetName}>{selected.name}</Text>
              <Text style={styles.sheetOffer}>{selected.offer}</Text>
              {selected.distance ? (
                <Text style={styles.sheetDist}>📍 {selected.distance}</Text>
              ) : null}
            </View>
          </View>
          <Pressable
            style={styles.sheetBtn}
            onPress={() => {
              closeSheet();
              navigation.navigate('OfferDetail', { offerId: selected.id });
            }}
          >
            <Text style={styles.sheetBtnText}>Voir l'offre</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  chips: { gap: 8, paddingRight: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  chipEmoji: { fontSize: 13 },
  chipLabel: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t2 },
  chipLabelActive: { color: '#FFFFFF' },
  toggleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    flexShrink: 0,
  },
  toggleBtnText: { fontSize: 18 },
  listView: { flex: 1, marginTop: 70 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 8 },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.s1,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listRowText: { flex: 1, gap: 2 },
  listRowName: { fontSize: 15, fontFamily: fonts.extraBold, color: colors.text },
  listRowOffer: { fontSize: 13, fontFamily: fonts.medium, color: colors.t2 },
  listRowDist: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t3 },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.s1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
    gap: 16,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.s3,
    alignSelf: 'center',
    marginBottom: 4,
  },
  sheetRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  sheetInfo: { flex: 1, gap: 4 },
  sheetName: { fontSize: 18, fontFamily: fonts.extraBold, color: colors.text },
  sheetOffer: { fontSize: 14, fontFamily: fonts.medium, color: colors.t2 },
  sheetDist: { fontSize: 12, fontFamily: fonts.semiBold, color: colors.t3 },
  sheetBtn: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sheetBtnText: { color: '#FFFFFF', fontSize: 16, fontFamily: fonts.extraBold },
});

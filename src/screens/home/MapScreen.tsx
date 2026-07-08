import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/constants/theme';
import { CAT_ICONS, CATEGORIES } from '@/constants/categories';
import { MAP_PARTNERS } from '@/data/mapPartners';
import type { MapPartner } from '@/data/mapPartners';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const PARIS: Region = {
  latitude: 48.862,
  longitude: 2.335,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

// ─── Pin custom ───────────────────────────────────────────────────────────────

interface PinProps {
  partner: MapPartner;
  selected: boolean;
}

function PartnerPin({ partner, selected }: PinProps): React.JSX.Element {
  const size = selected ? 52 : 44;
  const emojiSize = selected ? 24 : 20;
  const borderWidth = selected ? 3 : 2.5;

  return (
    <View style={styles.pinWrapper}>
      <View
        style={[
          styles.pinCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: partner.bg,
            borderWidth,
            backgroundColor: selected ? partner.bg : '#FFFFFF',
            shadowColor: partner.bg,
            shadowOffset: { width: 0, height: selected ? 6 : 3 },
            shadowRadius: selected ? 20 : 12,
            shadowOpacity: selected ? 0.35 : 0.18,
            elevation: selected ? 12 : 6,
          },
        ]}
      >
        <Text style={{ fontSize: emojiSize }}>{CAT_ICONS[partner.cat] ?? '📍'}</Text>
      </View>
      {/* Triangle pointer */}
      <View
        style={[
          styles.pinTriangle,
          {
            borderTopColor: partner.bg,
          },
        ]}
      />
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function MapScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const mapRef = useRef<MapView>(null);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sheetAnim = useRef(new Animated.Value(300)).current;

  const filtered = MAP_PARTNERS.filter((p) => {
    const catMatch = activeCat === 'all' || p.cat === activeCat;
    const q = search.toLowerCase();
    const searchMatch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.offer.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  const selectedPartner = MAP_PARTNERS.find((p) => p.id === selectedId) ?? null;

  const showSheet = (partner: MapPartner): void => {
    setSelectedId(partner.id);
    mapRef.current?.animateToRegion(
      {
        latitude: partner.lat,
        longitude: partner.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      400
    );
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const hideSheet = (): void => {
    Animated.timing(sheetAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedId(null));
  };

  const handlePinPress = (partner: MapPartner): void => {
    if (selectedId === partner.id) {
      hideSheet();
    } else {
      showSheet(partner);
    }
  };

  const handleCatChange = (id: string): void => {
    setActiveCat(id);
    setSelectedId(null);
    sheetAnim.setValue(300);
  };

  const handleSearchChange = (text: string): void => {
    setSearch(text);
    setSelectedId(null);
    sheetAnim.setValue(300);
  };

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={PARIS}
        showsUserLocation={false}
        onPress={hideSheet}
      >
        {filtered.map((partner) => (
          <Marker
            key={partner.id}
            coordinate={{ latitude: partner.lat, longitude: partner.lng }}
            onPress={() => handlePinPress(partner)}
            tracksViewChanges={false}
            zIndex={selectedId === partner.id ? 10 : 1}
          >
            <PartnerPin partner={partner} selected={selectedId === partner.id} />
          </Marker>
        ))}
      </MapView>

      {/* Header sticky (search + chips) */}
      <SafeAreaView edges={['top']} style={styles.headerSafe} pointerEvents="box-none">
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un partenaire…"
              placeholderTextColor={colors.t3}
              value={search}
              onChangeText={handleSearchChange}
              returnKeyType="search"
            />
            {search.length > 0 ? (
              <Pressable onPress={() => handleSearchChange('')} hitSlop={8}>
                <Text style={styles.clearBtn}>✕</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
          style={styles.chipsScroll}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.id;
            return (
              <Pressable
                key={cat.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => handleCatChange(cat.id)}
              >
                <Text style={styles.chipEmoji}>{cat.emoji}</Text>
                <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet */}
      {selectedPartner ? (
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: sheetAnim }] }]}
        >
          {/* Drag handle */}
          <View style={styles.sheetHandle} />

          {/* Partner info row */}
          <View style={styles.sheetRow}>
            {/* Logo */}
            <View
              style={[
                styles.sheetLogo,
                {
                  backgroundColor: selectedPartner.bg,
                  shadowColor: selectedPartner.bg,
                },
              ]}
            >
              <Text
                style={[
                  styles.sheetLogoText,
                  { fontSize: selectedPartner.initial.length <= 2 ? 20 : 12 },
                ]}
              >
                {selectedPartner.initial}
              </Text>
            </View>

            {/* Text block */}
            <View style={styles.sheetInfo}>
              <Text style={styles.sheetName}>{selectedPartner.name}</Text>
              <Text style={styles.sheetOffer} numberOfLines={2}>
                {selectedPartner.offer}
              </Text>
              <View style={styles.sheetBadges}>
                <View style={styles.badgeSaving}>
                  <Text style={styles.badgeSavingText}>{selectedPartner.saving}</Text>
                </View>
                <View style={styles.badgeCat}>
                  <Text style={styles.badgeCatText}>
                    {CAT_ICONS[selectedPartner.cat]}{' '}
                    {CATEGORIES.find((c) => c.id === selectedPartner.cat)?.label ?? ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* CTA button */}
          <Pressable
            onPress={() => {
              const pid = selectedPartner.id;
              hideSheet();
              // Find matching offer in OFFERS by name to get offerId, fallback to id
              navigation.navigate('OfferDetail', { offerId: pid, from: 'map' });
            }}
          >
            <LinearGradient
              colors={[colors.navy, colors.blue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sheetBtn}
            >
              <Text style={styles.sheetBtnText}>Voir l'offre</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  headerSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  searchContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
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
    paddingVertical: 11,
    height: 44,
  },
  searchIcon: { fontSize: 16, color: colors.t3 },
  searchInput: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
    padding: 0,
    margin: 0,
  },
  clearBtn: { fontSize: 14, color: colors.t3, paddingHorizontal: 4 },

  // Chips
  chipsScroll: { backgroundColor: colors.card },
  chipsContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 34,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: colors.s2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  chipEmoji: { fontSize: 13 },
  chipLabel: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  chipLabelActive: { color: '#FFFFFF' },

  // Pin
  pinWrapper: {
    alignItems: 'center',
  },
  pinCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Bottom sheet
  sheet: {
    position: 'absolute',
    bottom: 74,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 32,
    shadowOpacity: 0.14,
    elevation: 20,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.s3,
    alignSelf: 'center',
    marginBottom: 2,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sheetLogo: {
    width: 56,
    height: 56,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 8,
  },
  sheetLogoText: {
    fontFamily: fonts.extraBold,
    color: '#FFFFFF',
  },
  sheetInfo: {
    flex: 1,
    gap: 3,
  },
  sheetName: {
    fontFamily: fonts.extraBold,
    fontSize: 17,
    color: colors.text,
  },
  sheetOffer: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.t2,
  },
  sheetBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 7,
  },
  badgeSaving: {
    backgroundColor: colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  badgeSavingText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.greenD,
  },
  badgeCat: {
    backgroundColor: colors.blueXL,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginLeft: 'auto',
  },
  badgeCatText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.blue,
  },
  sheetBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  sheetBtnText: {
    fontFamily: fonts.extraBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

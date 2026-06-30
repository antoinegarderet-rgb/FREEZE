import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { PartnerLogo } from './PartnerLogo';
import type { Offer } from '@/data/offers';

interface OfferCardProps {
  offer: Offer;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function OfferCard({ offer, onPress, onFavorite, isFavorite = false }: OfferCardProps): React.JSX.Element {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Image area */}
      <View style={styles.imageArea}>
        <LinearGradient
          colors={[offer.bg, offer.bg2]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.logoContainer}>
          <PartnerLogo
            logo={offer.logo}
            name={offer.name}
            initial={offer.initial}
            bg={offer.bg}
            size={52}
            radius={14}
          />
        </View>
        {offer.tag ? (
          <View style={styles.tagChip}>
            <Text style={styles.tagText}>{offer.tag}</Text>
          </View>
        ) : null}
        <Pressable style={styles.heartBtn} onPress={onFavorite} hitSlop={8}>
          <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </Pressable>
        {offer.distance ? (
          <View style={styles.distanceChip}>
            <Text style={styles.distanceText}>📍 {offer.distance}</Text>
          </View>
        ) : null}
      </View>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.partnerName} numberOfLines={1}>{offer.name}</Text>
        <Text style={styles.offerText} numberOfLines={2}>{offer.offer}</Text>
        <View style={styles.savingChip}>
          <Text style={styles.savingText}>💰 {offer.saving}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.s1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    shadowOpacity: 0.08,
    flex: 1,
    margin: 6,
  },
  imageArea: {
    height: 110,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagChip: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  heartBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 13,
  },
  distanceChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  content: {
    padding: 12,
    gap: 4,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  offerText: {
    fontSize: 12,
    color: colors.t2,
    lineHeight: 16,
  },
  savingChip: {
    backgroundColor: colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  savingText: {
    color: colors.greenD,
    fontSize: 11,
    fontWeight: '700',
  },
});

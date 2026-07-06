import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, shadows } from '@/constants/theme';
import { PartnerLogo } from './PartnerLogo';
import type { Offer } from '@/data/offers';

const TAG_COLORS: Record<string, string> = {
  Populaire: colors.navy,
  Top:       colors.purple,
  Nouveau:   colors.green,
  Online:    '#0891B2',
};

interface OfferCardProps {
  offer: Offer;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function OfferCard({ offer, onPress, onFavorite, isFavorite = false }: OfferCardProps): React.JSX.Element {
  const tagColor = offer.tag ? (TAG_COLORS[offer.tag] ?? colors.navy) : null;

  return (
    <Pressable style={[styles.card, shadows.card as object]} onPress={onPress}>
      {/* Top area: logo + fav + tag */}
      <View style={styles.logoArea}>
        <PartnerLogo
          logo={offer.logo}
          name={offer.name}
          initial={offer.initial}
          bg={offer.bg}
          size={56}
          radius={16}
        />
        {offer.tag && tagColor ? (
          <View style={[styles.tagPill, { borderColor: tagColor }]}>
            <Text style={[styles.tagText, { color: tagColor }]}>{offer.tag}</Text>
          </View>
        ) : null}
        <Pressable style={styles.favBtn} onPress={onFavorite} hitSlop={8}>
          <Text style={styles.favIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{offer.name}</Text>
        <Text style={styles.offerText} numberOfLines={2}>{offer.offer}</Text>
        <View style={styles.footer}>
          <View style={styles.savingPill}>
            <Text style={styles.savingText}>{offer.saving}</Text>
          </View>
          {offer.distance ? (
            <Text style={styles.distText}>{offer.distance}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.s1,
    borderRadius: 18,
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoArea: {
    padding: 14,
    paddingBottom: 10,
    position: 'relative',
  },
  tagPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 100,
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.s1,
  },
  tagText: {
    fontSize: 10,
    fontFamily: fonts.extraBold,
    letterSpacing: 0.3,
  },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.s2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: { fontSize: 14 },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontFamily: fonts.extraBold,
    color: colors.text,
  },
  offerText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.t2,
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  savingPill: {
    backgroundColor: colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  savingText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.greenD,
  },
  distText: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    color: colors.t3,
  },
});

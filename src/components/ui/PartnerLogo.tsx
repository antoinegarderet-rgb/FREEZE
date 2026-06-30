import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface PartnerLogoProps {
  logo: number | null;
  name: string;
  initial: string;
  bg: string;
  size?: number;
  radius?: number;
}

export function PartnerLogo({ logo, initial, bg, size = 48, radius = 12 }: PartnerLogoProps): React.JSX.Element {
  if (logo) {
    return (
      <Image
        source={logo}
        style={[styles.image, { width: size, height: size, borderRadius: radius }]}
        resizeMode="cover"
      />
    );
  }
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: radius, backgroundColor: bg }]}>
      <Text style={[styles.initial, { fontSize: size * 0.35 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.s3,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});

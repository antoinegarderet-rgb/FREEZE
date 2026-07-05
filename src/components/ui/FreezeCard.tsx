import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { colors, fonts, shadows } from '@/constants/theme';
import { FreezeLogo } from './FreezeLogo';

interface FreezeCardProps {
  name: string;
  expired?: boolean;
  small?: boolean;
}

function useLiveTime(): string {
  const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);
  const fmt = (): string => {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function FreezeCard({ name, expired = false, small = false }: FreezeCardProps): React.JSX.Element {
  const cardW = small ? 190 : 320;
  const cardH = small ? 118 : 196;
  const borderRadius = small ? 14 : 22;

  // Shimmer: balaie la carte de gauche à droite en boucle
  const shimmerX = useRef(new Animated.Value(-cardW * 0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerX, { toValue: cardW * 1.2, duration: 2400, useNativeDriver: true }),
        Animated.delay(600),
        Animated.timing(shimmerX, { toValue: -cardW * 0.5, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmerX, cardW]);

  // Badge pulsant
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (small || expired) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.7, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim, small, expired]);

  const time = useLiveTime();

  const gradientColors: readonly [string, string, string] = expired
    ? ['#3B0A0A', '#7F1D1D', '#7F1D1D']
    : ['#1A1D8F', '#2B3FD4', '#3B52E8'];

  return (
    <View style={[styles.wrapper, { width: cardW, height: cardH, borderRadius }, shadows.navy as object]}>
      {/* Gradient de fond */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius }]}
      />

      {/* Dot pattern */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width={cardW} height={cardH}>
          <Defs>
            <Pattern id="dotsCard" x={0} y={0} width={14} height={14} patternUnits="userSpaceOnUse">
              <Circle cx={1} cy={1} r={1} fill="rgba(255,255,255,0.8)" />
            </Pattern>
          </Defs>
          <Rect width={cardW} height={cardH} fill="url(#dotsCard)" opacity={0.12} />
        </Svg>
      </View>

      {/* Shimmer sweep */}
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { transform: [{ translateX: shimmerX }] }]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.28)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: cardW * 0.45, height: cardH }}
        />
      </Animated.View>

      {/* Glow blob bas-droit */}
      <View
        pointerEvents="none"
        style={[
          styles.glowBlob,
          { backgroundColor: expired ? 'rgba(239,68,68,0.25)' : 'rgba(59,82,232,0.35)' },
        ]}
      />

      {/* Contenu */}
      <View style={[styles.content, { padding: small ? 12 : 20 }]}>
        {/* Ligne du haut : logo + badge */}
        <View style={styles.topRow}>
          <FreezeLogo height={small ? 22 : 32} white />
          {!small && !expired && (
            <View style={styles.activeBadge}>
              <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]} />
              <View style={styles.solidDot} />
              <Text style={styles.activeBadgeText}>MEMBRE ACTIF</Text>
            </View>
          )}
          {!small && expired && (
            <View style={[styles.activeBadge, styles.expiredBadge]}>
              <Text style={styles.activeBadgeText}>EXPIRÉE</Text>
            </View>
          )}
        </View>

        {/* Ligne du bas : nom + heure live */}
        <View style={styles.bottomRow}>
          <View
            style={[
              styles.nameBox,
              { borderRadius: small ? 8 : 12, paddingHorizontal: small ? 12 : 18, paddingVertical: small ? 6 : 12, flex: 1 },
            ]}
          >
            <Text style={[styles.nameText, { fontSize: small ? 12 : 19 }]} numberOfLines={1}>
              {name.toUpperCase()}
            </Text>
          </View>
          {!small && !expired && (
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Live · FREEZE</Text>
              <Text style={styles.timeValue}>{time}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,196,110,0.22)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(0,196,110,0.6)',
  },
  expiredBadge: {
    backgroundColor: 'rgba(239,68,68,0.22)',
    borderColor: 'rgba(239,68,68,0.5)',
  },
  pulseDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C46E',
    opacity: 0.5,
  },
  solidDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#00C46E',
  },
  activeBadgeText: {
    fontFamily: fonts.extraBold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  nameBox: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: fonts.extraBold,
    color: '#1A1D8F',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  timeBox: {
    alignItems: 'flex-end',
    gap: 2,
    flexShrink: 0,
  },
  timeLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
  },
  timeValue: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
  },
  glowBlob: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

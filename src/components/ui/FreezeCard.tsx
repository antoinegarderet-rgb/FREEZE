import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '@/constants/colors';

interface FreezeCardProps {
  name: string;
  expired?: boolean;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function LiveTime(): React.JSX.Element {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.liveTime}>{time}</Text>;
}

export function FreezeCard({ name, expired = false }: FreezeCardProps): React.JSX.Element {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleFlip = (): void => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      useNativeDriver: true,
      tension: 60,
      friction: 8,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  const cardWidth = 320;
  const cardHeight = 190;

  return (
    <Pressable onPress={handleFlip} style={styles.container}>
      {/* Front */}
      <Animated.View style={[styles.card, { width: cardWidth, height: cardHeight, transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }]}>
        <LinearGradient
          colors={['#1A1D8F', '#2B52F0', '#12156A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Dot pattern overlay */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={cardWidth} height={cardHeight}>
            <Defs>
              <RadialGradient id="dots" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect width={cardWidth} height={cardHeight} fill="url(#dots)" />
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 14 }).map((__, col) => (
                <Circle
                  key={`${row}-${col}`}
                  cx={col * 24 + 8}
                  cy={row * 26 + 8}
                  r={1.5}
                  fill="rgba(255,255,255,0.18)"
                />
              ))
            )}
          </Svg>
        </View>
        {/* Glow blob */}
        <View style={styles.glowBlob} pointerEvents="none" />

        <View style={styles.cardContent}>
          {/* Top row */}
          <View style={styles.topRow}>
            <Text style={styles.freezeLabel}>FREEZE</Text>
            <View style={styles.activeBadge}>
              <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]} />
              <View style={styles.solidDot} />
              <Text style={styles.activeBadgeText}>{expired ? 'EXPIRÉE' : 'MEMBRE ACTIF'}</Text>
            </View>
          </View>
          {/* Name box */}
          <View style={styles.nameBox}>
            <Text style={styles.nameLabel}>TITULAIRE</Text>
            <Text style={styles.nameText}>{name.toUpperCase()}</Text>
          </View>
          {/* Bottom row */}
          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.bottomLabel}>VALIDE JUSQU'AU</Text>
              <Text style={styles.bottomValue}>31/08/2025</Text>
            </View>
            <LiveTime />
          </View>
        </View>
      </Animated.View>

      {/* Back */}
      <Animated.View style={[styles.card, styles.cardBack, { width: cardWidth, height: cardHeight, transform: [{ perspective: 1000 }, { rotateY: backRotate }] }]}>
        <LinearGradient
          colors={['#12156A', '#1A1D8F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.backContent}>
          <Text style={styles.backTitle}>Scanner pour valider</Text>
          <View style={styles.qrWrapper}>
            <QRCode
              value="FREEZE-ANTOINE-2025"
              size={110}
              color={colors.navy}
              backgroundColor="white"
            />
          </View>
          <Text style={styles.backHint}>Présente ce QR code au partenaire</Text>
        </View>
      </Animated.View>

      <Text style={styles.tapHint}>Appuie pour retourner</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 0.35,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  glowBlob: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(75,100,245,0.3)',
    top: -60,
    right: -40,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  freezeLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 3,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C46E',
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  nameBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nameLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  bottomValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  liveTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  backContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  backTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  qrWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
  },
  backHint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
  },
  tapHint: {
    marginTop: 10,
    fontSize: 12,
    color: colors.t3,
    fontWeight: '500',
  },
});

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { fonts } from '@/constants/theme';
import type { MainStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'PostScan'>;
type Nav = NativeStackNavigationProp<MainStackParamList>;

function useLiveClock(): string {
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

export function PostScanScreen({ route }: Props): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { partner, offer, alreadyUsed, discovery } = route.params ?? {};
  const time = useLiveClock();

  const checkScale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 6,
    }).start();
  }, [checkScale]);

  if (alreadyUsed) {
    return (
      <LinearGradient colors={['#1A1D8F', '#2B52F0']} style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.inner, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
          <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
          <Animated.View style={[styles.iconCircle, styles.iconCircleRed, { transform: [{ scale: checkScale }] }]}>
            <Text style={styles.iconText}>✕</Text>
          </Animated.View>
          <Text style={styles.title}>Offre déjà utilisée</Text>
          <Text style={styles.subtitle}>Tu ne peux plus utiliser cette offre pour le moment.</Text>
          <View style={styles.spacer} />
          <Pressable style={styles.okBtn} onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.okBtnText}>Voir les autres offres</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1A1D8F', '#2B52F0']} style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.inner, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
        {/* Close button */}
        <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>

        {/* Discovery banner */}
        {discovery ? (
          <View style={styles.discoveryBanner}>
            <Text style={styles.discoveryText}>🎁 Cadeau de bienvenue — utilisable une seule fois</Text>
          </View>
        ) : null}

        {/* Check icon */}
        <Animated.View style={[styles.iconCircle, { transform: [{ scale: checkScale }] }]}>
          <Text style={styles.iconText}>✓</Text>
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>Scan validé</Text>
        {partner ? (
          <Text style={styles.subtitle}>
            chez <Text style={styles.subtitleBold}>{partner}</Text>
          </Text>
        ) : null}

        {/* Offer glass card */}
        {offer ? (
          <View style={styles.offerCard}>
            <Text style={styles.offerCardLabel}>OFFRE DISPONIBLE</Text>
            <Text style={styles.offerCardText}>{offer}</Text>
          </View>
        ) : null}

        {/* Live clock */}
        <View style={styles.clockArea}>
          <Text style={styles.clockTime}>{time}</Text>
          <Text style={styles.clockLabel}>Live · FREEZE</Text>
        </View>

        {/* OK button */}
        <Pressable style={styles.okBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.okBtnText}>OK 👍</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  discoveryBanner: {
    backgroundColor: 'rgba(245,158,11,0.25)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: '100%',
  },
  discoveryText: {
    color: '#FDE68A',
    fontSize: 13,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  iconCircleRed: {
    backgroundColor: '#FEE2E2',
  },
  iconText: {
    fontSize: 40,
    color: '#00C46E',
  },
  title: {
    fontFamily: fonts.black,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  subtitleBold: {
    fontFamily: fonts.bold,
    color: 'rgba(255,255,255,0.9)',
  },
  offerCard: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  offerCardLabel: {
    fontFamily: fonts.extraBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2,
  },
  offerCardText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  spacer: { flex: 1 },
  clockArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  clockTime: {
    fontFamily: 'monospace',
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  clockLabel: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
  },
  okBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  okBtnText: {
    fontFamily: fonts.extraBold,
    fontSize: 18,
    color: '#1A1D8F',
  },
});

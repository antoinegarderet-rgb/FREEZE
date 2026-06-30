import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { Animated } from 'react-native';
import type { MainStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'Scanner'>;
type Nav = NativeStackNavigationProp<MainStackParamList>;

export function ScannerScreen({ route }: Props): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { scanContext } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const lineY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission?.granted) {
      void requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineY, { toValue: 220, duration: 1800, useNativeDriver: true }),
        Animated.timing(lineY, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, [lineY]);

  const FRAME = 240;

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.noCamBg]} />
      )}

      {/* Dark overlay with frame hole */}
      <View style={styles.overlay}>
        <View style={styles.topDark} />
        <View style={styles.middleRow}>
          <View style={styles.sideDark} />
          <View style={[styles.frame, { width: FRAME, height: FRAME }]}>
            {/* Corner brackets */}
            <Svg width={FRAME} height={FRAME} style={StyleSheet.absoluteFill}>
              {/* TL */}
              <Path d={`M 0 40 L 0 0 L 40 0`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
              {/* TR */}
              <Path d={`M ${FRAME - 40} 0 L ${FRAME} 0 L ${FRAME} 40`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
              {/* BL */}
              <Path d={`M 0 ${FRAME - 40} L 0 ${FRAME} L 40 ${FRAME}`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
              {/* BR */}
              <Path d={`M ${FRAME - 40} ${FRAME} L ${FRAME} ${FRAME} L ${FRAME} ${FRAME - 40}`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
            </Svg>
            {/* Scanning line */}
            <Animated.View style={[styles.scanLine, { transform: [{ translateY: lineY }] }]} />
          </View>
          <View style={styles.sideDark} />
        </View>
        <View style={styles.bottomDark} />
      </View>

      {/* Header */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Scanner</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      {/* Bottom */}
      <SafeAreaView style={styles.bottom} edges={['bottom']}>
        <Text style={styles.hint}>
          {scanContext === 'generic'
            ? 'Scanne le QR code du partenaire pour utiliser ton offre'
            : 'Scanne le QR code affiché chez le partenaire'}
        </Text>

        {/* Dev simulate button */}
        <Pressable
          style={styles.simulateBtn}
          onPress={() => navigation.navigate('PostScan', { scanContext: scanContext === 'generic' ? undefined : scanContext, partner: "McDonald's", offer: '-20% sur ta commande' })}
        >
          <Text style={styles.simulateBtnText}>Simuler un scan (dev)</Text>
        </Pressable>

        <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Annuler</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  noCamBg: { backgroundColor: '#1A1A1A' },
  overlay: { ...StyleSheet.absoluteFillObject },
  topDark: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  middleRow: { flexDirection: 'row', height: 240 },
  sideDark: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  bottomDark: { flex: 1.5, backgroundColor: 'rgba(0,0,0,0.6)' },
  frame: { position: 'relative' },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,196,110,0.8)',
    shadowColor: '#00C46E',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  backText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  hint: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  simulateBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  simulateBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  cancelBtn: {
    paddingVertical: 10,
  },
  cancelText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
});

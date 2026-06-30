import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { FreezeCard } from '@/components/ui/FreezeCard';
import { useAuth } from '@/contexts/AuthContext';

const STATS = [
  { label: 'Économisés', value: '127€', icon: '💰', color: colors.green },
  { label: 'Offres utilisées', value: '38', icon: '🎯', color: colors.blue },
  { label: 'Carte rentabilisée', value: '12×', icon: '🚀', color: colors.purple },
  { label: 'Expiration', value: '31 août', icon: '📅', color: colors.amber },
];

export function CarteScreen(): React.JSX.Element {
  const { profile } = useAuth();
  const [fullscreen, setFullscreen] = useState(false);
  const firstName = profile?.first_name ?? 'Antoine';
  const lastName = profile?.last_name ?? 'G.';
  const name = `${firstName} ${lastName}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Ma carte</Text>
            <Text style={styles.subtitle}>Carte personnelle et nominative</Text>
          </View>
          <View style={styles.activeChip}>
            <View style={styles.activeDot} />
            <Text style={styles.activeChipText}>Carte active</Text>
          </View>
        </View>

        {/* Card */}
        <View style={styles.cardSection}>
          <FreezeCard name={name} />
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Pressable style={styles.fullscreenBtn} onPress={() => setFullscreen(true)}>
          <Text style={styles.fullscreenBtnIcon}>⛶</Text>
          <Text style={styles.fullscreenBtnText}>Afficher ma carte en plein écran</Text>
        </Pressable>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Ta carte est nominative. Ne la partage pas. Présente-la sur ton téléphone chez nos partenaires pour profiter de tes avantages.
          </Text>
        </View>
      </ScrollView>

      {/* Fullscreen modal */}
      <Modal visible={fullscreen} animationType="fade" statusBarTranslucent>
        <View style={styles.fullscreenModal}>
          <Pressable style={styles.closeBtn} onPress={() => setFullscreen(false)}>
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
          <FreezeCard name={name} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.t2,
    marginTop: 2,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenBg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  activeChipText: {
    color: colors.greenD,
    fontSize: 13,
    fontWeight: '700',
  },
  cardSection: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.s1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
    gap: 4,
  },
  statIcon: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 12,
    color: colors.t2,
    fontWeight: '500',
    textAlign: 'center',
  },
  fullscreenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
    borderRadius: 14,
    marginHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 16,
  },
  fullscreenBtnIcon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  fullscreenBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.blueXL,
    borderRadius: 14,
    marginHorizontal: 20,
    padding: 14,
    gap: 10,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.t2,
    lineHeight: 18,
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: colors.navyD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { FreezeCard } from '@/components/ui/FreezeCard';
import { useAuth } from '@/contexts/AuthContext';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function ProfilScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { profile } = useAuth();
  const firstName = profile?.first_name ?? 'Antoine';
  const lastName = profile?.last_name ?? 'G.';
  const name = `${firstName} ${lastName}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Salut {firstName} 👋</Text>
          <Pressable style={styles.settingsBtn} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        </View>

        {/* Card (slightly tilted) */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardTilt}>
            <FreezeCard name={name} />
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>127€</Text>
            <Text style={styles.statLabel}>Économisés</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>38</Text>
            <Text style={styles.statLabel}>Offres utilisées</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12×</Text>
            <Text style={styles.statLabel}>Rentabilisée</Text>
          </View>
        </View>

        {/* Green message */}
        <View style={styles.greenMessage}>
          <Text style={styles.greenMessageIcon}>🚀</Text>
          <Text style={styles.greenMessageText}>
            Ta carte est rentabilisée 12× ! Tu économises bien plus que le coût de ton abonnement.
          </Text>
        </View>

        {/* History block */}
        <Pressable style={styles.historyBlock} onPress={() => navigation.navigate('History')}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyIcon}>🕐</Text>
            <View>
              <Text style={styles.historyTitle}>Mes offres utilisées</Text>
              <Text style={styles.historySub}>38 offres · voir tout</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Savings block */}
        <Pressable style={styles.historyBlock} onPress={() => navigation.navigate('Savings')}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyIcon}>💰</Text>
            <View>
              <Text style={styles.historyTitle}>Mes économies</Text>
              <Text style={styles.historySub}>127€ économisés au total</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Menu items */}
        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Favoris')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}><Text style={styles.menuIcon}>❤️</Text></View>
              <Text style={styles.menuLabel}>Mes favoris</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Parrainage' as never)}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}><Text style={styles.menuIcon}>🎁</Text></View>
              <Text style={styles.menuLabel}>Parrainer un ami</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}><Text style={styles.menuIcon}>⚙️</Text></View>
              <Text style={styles.menuLabel}>Paramètres</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: { fontSize: 24, fontWeight: '900', color: colors.text },
  settingsBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.s2, alignItems: 'center', justifyContent: 'center',
  },
  settingsIcon: { fontSize: 18 },
  cardWrapper: { alignItems: 'center', paddingVertical: 16 },
  cardTilt: { transform: [{ rotate: '-2deg' }] },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.s1,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 11, color: colors.t2, marginTop: 2, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border, marginVertical: 4 },
  greenMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.greenBg,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,196,110,0.2)',
  },
  greenMessageIcon: { fontSize: 18 },
  greenMessageText: { flex: 1, fontSize: 13, color: colors.greenD, lineHeight: 18, fontWeight: '500' },
  historyBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.s1,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    elevation: 1,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyIcon: { fontSize: 22 },
  historyTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  historySub: { fontSize: 12, color: colors.t2, marginTop: 2 },
  arrow: { fontSize: 20, color: colors.t3 },
  menuSection: {
    backgroundColor: colors.s1,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.s2, alignItems: 'center', justifyContent: 'center',
  },
  menuIcon: { fontSize: 18 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
});

import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const CODE = 'ANTO42';

const FILLEULS = [
  { name: 'Marie L.', date: '12 juin', status: 'validé', amount: '4€' },
  { name: 'Tom B.', date: '8 juin', status: 'validé', amount: '4€' },
  { name: 'Clara M.', date: '1 juin', status: 'en attente', amount: '-' },
  { name: 'Julien P.', date: '25 mai', status: 'validé', amount: '4€' },
];

const HOW_STEPS = [
  { n: '1', title: 'Partage ton code', desc: 'Envoie ton code ANTO42 à tes amis de moins de 30 ans.' },
  { n: '2', title: 'Ils s\'abonnent', desc: 'Ton ami utilise ton code pour créer son compte FREEZE.' },
  { n: '3', title: 'Tu touches 4€', desc: 'Dès que ton filleul valide son abonnement, tu reçois 4€.' },
];

export function ParrainageScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [activeTab, setActiveTab] = useState<'tous' | 'validés' | 'en attente'>('tous');
  const [howOpen, setHowOpen] = useState(false);

  const filtered = activeTab === 'tous' ? FILLEULS
    : activeTab === 'validés' ? FILLEULS.filter((f) => f.status === 'validé')
    : FILLEULS.filter((f) => f.status === 'en attente');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Parrainage</Text>
          <Text style={styles.subtitle}>Gagne 4€ pour chaque ami qui s'abonne</Text>
        </View>

        {/* Hero code card */}
        <LinearGradient colors={[colors.navy, colors.navyD]} style={styles.heroCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.heroLabel}>TON CODE PARRAIN</Text>
          <Text style={styles.heroCode}>{CODE}</Text>
          <View style={styles.heroActions}>
            <Pressable style={styles.heroBtn}>
              <Text style={styles.heroBtnIcon}>📋</Text>
              <Text style={styles.heroBtnText}>Copier</Text>
            </Pressable>
            <Pressable style={styles.heroBtn}>
              <Text style={styles.heroBtnIcon}>📤</Text>
              <Text style={styles.heroBtnText}>Partager</Text>
            </Pressable>
            <Pressable style={[styles.heroBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Text style={styles.heroBtnIcon}>▣</Text>
              <Text style={styles.heroBtnText}>QR</Text>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Inscrits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.green }]}>8</Text>
            <Text style={styles.statLabel}>Validés</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.navy }]}>32€</Text>
            <Text style={styles.statLabel}>Gagnés</Text>
          </View>
        </View>

        {/* Solde card */}
        <View style={styles.soldeCard}>
          <View style={styles.soldeLeft}>
            <Text style={styles.soldeLabel}>Mon solde</Text>
            <Text style={styles.soldeValue}>32,00 €</Text>
            <Text style={styles.soldeHint}>Disponible au virement</Text>
          </View>
          <Pressable style={styles.withdrawBtn} onPress={() => navigation.navigate('PayoutsHistory')}>
            <Text style={styles.withdrawText}>Retirer</Text>
          </Pressable>
        </View>

        {/* RIB banner */}
        <Pressable style={styles.ribBanner} onPress={() => navigation.navigate('RIBForm')}>
          <Text style={styles.ribIcon}>🏦</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.ribTitle}>Ajoute ton RIB pour retirer</Text>
            <Text style={styles.ribSub}>Nécessaire pour recevoir tes gains</Text>
          </View>
          <Text style={styles.ribArrow}>›</Text>
        </Pressable>

        {/* Filleuls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes filleuls</Text>
          <View style={styles.tabsRow}>
            {(['tous', 'validés', 'en attente'] as const).map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              </Pressable>
            ))}
          </View>
          {filtered.map((f, i) => (
            <View key={i} style={styles.filleulRow}>
              <View style={styles.filleulAvatar}>
                <Text style={styles.filleulAvatarText}>{f.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.filleulName}>{f.name}</Text>
                <Text style={styles.filleulDate}>{f.date}</Text>
              </View>
              <View style={[styles.statusChip, f.status === 'validé' ? styles.statusValid : styles.statusPending]}>
                <Text style={[styles.statusText, f.status === 'validé' ? styles.statusValidText : styles.statusPendingText]}>
                  {f.status === 'validé' ? `+${f.amount}` : 'En attente'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Comment ça marche */}
        <Pressable style={styles.howHeader} onPress={() => setHowOpen((o) => !o)}>
          <Text style={styles.howTitle}>Comment ça marche ?</Text>
          <Text style={styles.howChevron}>{howOpen ? '▲' : '▼'}</Text>
        </Pressable>
        {howOpen && (
          <View style={styles.howContent}>
            {HOW_STEPS.map((step) => (
              <View key={step.n} style={styles.howStep}>
                <View style={styles.howNum}><Text style={styles.howNumText}>{step.n}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.howStepTitle}>{step.title}</Text>
                  <Text style={styles.howStepDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
            <Pressable style={styles.conditionsLink} onPress={() => navigation.navigate('ParrainageConditions')}>
              <Text style={styles.conditionsText}>Voir les conditions complètes →</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '900', color: colors.text },
  subtitle: { fontSize: 14, color: colors.t2, marginTop: 4 },
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    marginBottom: 12,
    elevation: 6,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.3,
  },
  heroLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  heroCode: { color: '#FFFFFF', fontSize: 36, fontWeight: '900', letterSpacing: 4, marginBottom: 20 },
  heroActions: { flexDirection: 'row', gap: 10 },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBtnIcon: { fontSize: 14, color: '#FFFFFF' },
  heroBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
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
  statValue: { fontSize: 22, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 11, color: colors.t2, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: colors.border, marginVertical: 4 },
  soldeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenBg,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,196,110,0.2)',
  },
  soldeLeft: { flex: 1 },
  soldeLabel: { fontSize: 12, color: colors.greenD, fontWeight: '600' },
  soldeValue: { fontSize: 26, fontWeight: '900', color: colors.greenD },
  soldeHint: { fontSize: 11, color: colors.greenD, opacity: 0.7 },
  withdrawBtn: {
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  withdrawText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  ribBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.amberBg,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
  },
  ribIcon: { fontSize: 22 },
  ribTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  ribSub: { fontSize: 12, color: colors.t2, marginTop: 2 },
  ribArrow: { fontSize: 20, color: colors.t3 },
  section: {
    backgroundColor: colors.s1,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 12 },
  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.s2,
  },
  tabActive: { backgroundColor: colors.navy },
  tabText: { fontSize: 12, fontWeight: '600', color: colors.t2 },
  tabTextActive: { color: '#FFFFFF' },
  filleulRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  filleulAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.blueXL, alignItems: 'center', justifyContent: 'center',
  },
  filleulAvatarText: { fontSize: 16, fontWeight: '700', color: colors.navy },
  filleulName: { fontSize: 14, fontWeight: '600', color: colors.text },
  filleulDate: { fontSize: 12, color: colors.t2 },
  statusChip: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusValid: { backgroundColor: colors.greenBg },
  statusPending: { backgroundColor: colors.amberBg },
  statusText: { fontSize: 12, fontWeight: '700' },
  statusValidText: { color: colors.greenD },
  statusPendingText: { color: colors.amber },
  howHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.s1,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 16,
    elevation: 1,
    shadowColor: '#1A1D8F',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
  },
  howTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  howChevron: { color: colors.t2, fontSize: 12 },
  howContent: {
    backgroundColor: colors.s1,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 2,
    padding: 16,
    gap: 14,
  },
  howStep: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  howNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center',
  },
  howNumText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  howStepTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  howStepDesc: { fontSize: 13, color: colors.t2, marginTop: 2, lineHeight: 18 },
  conditionsLink: { alignItems: 'center', paddingTop: 4 },
  conditionsText: { color: colors.blue, fontSize: 13, fontWeight: '600' },
});

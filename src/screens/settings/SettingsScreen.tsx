import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

const SECTIONS = [
  {
    title: 'Compte',
    items: [
      { icon: '👤', label: 'Mes informations', screen: 'AccountInfo' as const },
      { icon: '💳', label: 'Mon abonnement', screen: 'Subscription' as const },
    ],
  },
  {
    title: 'Légal',
    items: [
      { icon: '📋', label: 'Mentions légales', screen: 'LegalDoc' as const, params: { title: 'Mentions légales', kind: 'mentions' as const } },
      { icon: '📄', label: 'CGU', screen: 'LegalDoc' as const, params: { title: 'CGU', kind: 'cgu' as const } },
      { icon: '🔒', label: 'Politique de confidentialité', screen: 'LegalDoc' as const, params: { title: 'Confidentialité', kind: 'privacy' as const } },
      { icon: '📊', label: 'Mes données', screen: 'MyData' as const },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'FAQ', screen: 'FAQ' as const },
      { icon: '✉️', label: 'Nous contacter', screen: 'Contact' as const },
    ],
  },
];

export function SettingsScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Paramètres</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <Pressable
                  key={item.label}
                  style={[styles.row, i < section.items.length - 1 && styles.rowBorder]}
                  onPress={() => navigation.navigate(item.screen as any, (item as any).params)}
                >
                  <Text style={styles.rowIcon}>{item.icon}</Text>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Pressable style={styles.logoutBtn} onPress={() => void signOut()}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, color: colors.text },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  scroll: { padding: 16, gap: 8, paddingBottom: 32 },
  section: { marginBottom: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.t3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, paddingHorizontal: 4 },
  sectionCard: { backgroundColor: colors.s1, borderRadius: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { fontSize: 20, width: 28 },
  rowLabel: { flex: 1, fontSize: 15, color: colors.text, fontWeight: '500' },
  chevron: { fontSize: 20, color: colors.t3 },
  logoutBtn: { marginTop: 16, backgroundColor: '#FFF0F0', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  logoutText: { color: '#E53E3E', fontSize: 15, fontWeight: '700' },
});

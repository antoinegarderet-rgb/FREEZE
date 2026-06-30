import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function AccountInfoScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { profile } = useAuth();

  const fields = [
    { label: 'Prénom', value: profile?.first_name ?? 'Antoine' },
    { label: 'Nom', value: profile?.last_name ?? 'Dupont' },
    { label: 'Email', value: profile?.phone ?? 'antoine@example.com' },
    { label: 'Date de naissance', value: profile?.birth_date ?? '01/01/1999' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mes informations</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          {fields.map((f, i) => (
            <View key={f.label} style={[styles.field, i < fields.length - 1 && styles.fieldBorder]}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <Text style={styles.fieldValue}>{f.value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Pour modifier tes informations, contacte notre support.</Text>
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
  scroll: { padding: 16 },
  card: { backgroundColor: colors.s1, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  field: { paddingHorizontal: 16, paddingVertical: 14 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  fieldLabel: { fontSize: 12, color: colors.t3, fontWeight: '600', marginBottom: 4 },
  fieldValue: { fontSize: 15, color: colors.text, fontWeight: '500' },
  note: { fontSize: 13, color: colors.t2, textAlign: 'center', lineHeight: 18 },
});

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function MyDataScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mes données</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Données collectées</Text>
          <Text style={styles.cardText}>Nous collectons uniquement les données nécessaires au bon fonctionnement de l'application : nom, prénom, email, date de naissance, et historique d'utilisation des offres.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tes droits</Text>
          <Text style={styles.cardText}>Conformément au RGPD, tu as le droit d'accéder, de rectifier et de supprimer tes données personnelles. Contacte-nous via Support {">"} Nous contacter.</Text>
        </View>
        <Pressable style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Supprimer mon compte et mes données</Text>
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
  scroll: { padding: 16, gap: 12 },
  card: { backgroundColor: colors.s1, borderRadius: 16, padding: 16, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
  cardText: { fontSize: 14, color: colors.t2, lineHeight: 20 },
  deleteBtn: { marginTop: 8, backgroundColor: '#FFF0F0', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  deleteText: { color: '#E53E3E', fontSize: 15, fontWeight: '700' },
});

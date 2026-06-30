import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function ParrainageConditionsScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Conditions de parrainage</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.content}>{`CONDITIONS DU PROGRAMME DE PARRAINAGE FREEZE\n\n1. ÉLIGIBILITÉ\nTout membre FREEZE actif peut parrainer des amis. Le filleul doit être une nouvelle inscription et avoir moins de 30 ans.\n\n2. RÉCOMPENSE\nPour chaque filleul qui souscrit un abonnement payant avec ton code, tu gagnes 4€ crédités sur ton solde FREEZE.\n\n3. VERSEMENT\nLe versement est effectué une fois que ton solde atteint 10€ minimum. Les gains sont versés sur le RIB que tu renseignes dans l'application.\n\n4. LIMITATIONS\nLe parrainage ne s'applique pas aux offres d'essai gratuit. FREEZE se réserve le droit de modifier ou d'interrompre le programme à tout moment.\n\n5. ABUS\nTout abus du programme (faux comptes, auto-parrainage, etc.) entraînera la résiliation immédiate du compte et la perte des gains.`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, color: colors.text },
  title: { fontSize: 15, fontWeight: '800', color: colors.text },
  scroll: { padding: 20 },
  content: { fontSize: 14, color: colors.t2, lineHeight: 22 },
});

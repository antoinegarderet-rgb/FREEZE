import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;
type Props = NativeStackScreenProps<MainStackParamList, 'LegalDoc'>;

const CONTENT: Record<string, string> = {
  mentions: `MENTIONS LÉGALES\n\nÉditeur : FREEZE SAS\nSiège social : Paris, France\nEmail : contact@freezeapp.fr\n\nL'application FREEZE est éditée par FREEZE SAS, société par actions simplifiée au capital de 10 000€.`,
  cgu: `CONDITIONS GÉNÉRALES D'UTILISATION\n\nEn utilisant l'application FREEZE, vous acceptez les présentes CGU.\n\nFREEZE est une plateforme de réductions destinée aux moins de 30 ans. Les offres sont proposées par des partenaires tiers et peuvent évoluer sans préavis.\n\nL'abonnement est annulable à tout moment. Le remboursement n'est pas possible après activation.`,
  privacy: `POLITIQUE DE CONFIDENTIALITÉ\n\nFREEZE collecte uniquement les données nécessaires au fonctionnement du service :\n- Nom, prénom, email, date de naissance\n- Historique d'utilisation des offres\n\nConformément au RGPD, vous pouvez exercer vos droits en nous contactant via l'application.`,
};

export function LegalDocScreen({ route }: Props): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { title, kind } = route.params;
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.content}>{CONTENT[kind] ?? ''}</Text>
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
  scroll: { padding: 20 },
  content: { fontSize: 14, color: colors.t2, lineHeight: 22 },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'PostScan'>;
type Nav = NativeStackNavigationProp<MainStackParamList>;

export function PostScanScreen({ route }: Props): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { partner, offer, alreadyUsed } = route.params ?? {};

  if (alreadyUsed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Offre déjà utilisée</Text>
          <Text style={styles.offerText}>Tu as déjà utilisé cette offre récemment.</Text>
          <Pressable style={styles.btn} onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.btnText}>Retour aux offres</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>Offre validée !</Text>
        {partner ? <Text style={styles.partnerName}>{partner}</Text> : null}
        {offer ? <Text style={styles.offerText}>{offer}</Text> : null}
        <View style={styles.savingBox}>
          <Text style={styles.savingLabel}>Économie estimée</Text>
          <Text style={styles.savingValue}>~3€</Text>
        </View>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.btnText}>Super, merci !</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate('History')}>
          <Text style={styles.secondaryBtnText}>Voir mon historique</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  successCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.greenBg,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  icon: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: '900', color: colors.text, textAlign: 'center' },
  partnerName: { fontSize: 18, fontWeight: '700', color: colors.navy },
  offerText: { fontSize: 15, color: colors.t2, textAlign: 'center' },
  savingBox: {
    backgroundColor: colors.greenBg,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,196,110,0.2)',
  },
  savingLabel: { fontSize: 12, color: colors.greenD, fontWeight: '600' },
  savingValue: { fontSize: 28, fontWeight: '900', color: colors.greenD },
  btn: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  secondaryBtn: { paddingVertical: 8 },
  secondaryBtnText: { color: colors.t2, fontSize: 14 },
});

import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function RIBFormScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Ajouter un RIB</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.info}>Renseigne ton IBAN pour recevoir tes gains de parrainage directement sur ton compte bancaire.</Text>
        <Text style={styles.label}>Titulaire du compte</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Prénom Nom" placeholderTextColor={colors.t3} />
        <Text style={styles.label}>IBAN</Text>
        <TextInput style={styles.input} value={iban} onChangeText={setIban} placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" placeholderTextColor={colors.t3} autoCapitalize="characters" />
        <Text style={styles.label}>BIC</Text>
        <TextInput style={styles.input} value={bic} onChangeText={setBic} placeholder="XXXXXXXX" placeholderTextColor={colors.t3} autoCapitalize="characters" />
        <Pressable style={[styles.btn, (!iban || !bic || !name) && styles.btnDisabled]} disabled={!iban || !bic || !name} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Enregistrer</Text>
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
  scroll: { padding: 16, gap: 8 },
  info: { fontSize: 14, color: colors.t2, lineHeight: 20, marginBottom: 8 },
  label: { fontSize: 13, fontWeight: '700', color: colors.t2, marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: colors.s1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border },
  btn: { backgroundColor: colors.navy, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});

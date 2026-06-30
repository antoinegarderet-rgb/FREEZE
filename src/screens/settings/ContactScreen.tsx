import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function ContactScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.title}>Contact</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Message envoyé !</Text>
          <Text style={styles.successText}>On te répond dans les 24h.</Text>
          <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Retour</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Nous contacter</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.label}>Sujet</Text>
        <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Sujet de ton message" placeholderTextColor={colors.t3} />
        <Text style={styles.label}>Message</Text>
        <TextInput style={[styles.input, styles.textarea]} value={message} onChangeText={setMessage} placeholder="Décris ton problème ou ta question..." placeholderTextColor={colors.t3} multiline numberOfLines={6} textAlignVertical="top" />
        <Pressable style={[styles.btn, (!subject || !message) && styles.btnDisabled]} onPress={() => setSent(true)} disabled={!subject || !message}>
          <Text style={styles.btnText}>Envoyer</Text>
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
  label: { fontSize: 13, fontWeight: '700', color: colors.t2, marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: colors.s1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border },
  textarea: { height: 140, paddingTop: 12 },
  btn: { backgroundColor: colors.navy, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  successBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  successIcon: { fontSize: 56 },
  successTitle: { fontSize: 24, fontWeight: '900', color: colors.text },
  successText: { fontSize: 15, color: colors.t2 },
});

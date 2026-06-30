import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { OfferCard } from '@/components/ui/OfferCard';
import { OFFERS } from '@/data/offers';
import type { MainStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<MainStackParamList>;

export function FavorisScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [favIds, setFavIds] = useState<number[]>([1, 6, 12]);
  const favOffers = OFFERS.filter((o) => favIds.includes(o.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mes favoris</Text>
        <View style={{ width: 40 }} />
      </View>
      {favOffers.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>Ajoute des offres en favoris depuis la page Offres</Text>
        </View>
      ) : (
        <FlatList
          data={favOffers}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <OfferCard
              offer={item}
              onPress={() => navigation.navigate('OfferDetail', { offerId: item.id })}
              onFavorite={() => setFavIds((p) => p.filter((id) => id !== item.id))}
              isFavorite
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, color: colors.text },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  list: { padding: 10, paddingBottom: 24 },
  row: { paddingHorizontal: 0 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  emptyText: { fontSize: 14, color: colors.t2, textAlign: 'center', paddingHorizontal: 32 },
});

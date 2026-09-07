import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { adhkar } from '@/data/adhkar';
import { DhikrCard } from '@/components/DhikrCard';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites } = useAdhkar();
  const favoriteItems = adhkar.filter((item) => favorites.includes(item.id));

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 110 }}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>محفوظاتك</Text>
          <Text style={[styles.title, { color: colors.primary }]}>المفضلة</Text>
        </View>
        {favoriteItems.length === 0 ? (
          <View style={[styles.empty, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.accent }]}><Feather name="heart" size={23} color={colors.accentForeground} /></View>
            <Text style={[styles.emptyTitle, { color: colors.primary }]}>لم تحفظ أذكاراً بعد</Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>اضغط على القلب بجانب أي ذكر لتجده هنا بسرعة.</Text>
          </View>
        ) : (
          <View style={styles.list}>{favoriteItems.map((item) => <DhikrCard key={item.id} item={item} />)}</View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 22, marginBottom: 25, alignItems: 'flex-end' },
  eyebrow: { fontSize: 13, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '700' },
  empty: { marginHorizontal: 20, borderRadius: 23, borderWidth: 1, paddingHorizontal: 28, paddingVertical: 42, alignItems: 'center' },
  emptyIcon: { width: 56, height: 56, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 7 },
  emptyText: { fontSize: 13, lineHeight: 21, textAlign: 'center' },
  list: { paddingHorizontal: 18, gap: 14 },
});

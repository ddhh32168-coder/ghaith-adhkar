import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories, getCategory, adhkar } from '@/data/adhkar';
import { DhikrCard } from '@/components/DhikrCard';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';
import { ProgressRing } from '@/components/ProgressRing';

export default function CategoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const category = getCategory(slug);
  const { getDhikrProgress } = useAdhkar();
  const items = adhkar.filter((item) => item.category === category.slug);
  const completed = items.filter((item) => getDhikrProgress(item.id) >= item.target).length;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 15, paddingBottom: 35 }}>
        <View style={styles.nav}>
          <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="رجوع" style={({ pressed }) => [styles.back, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}>
            <Feather name="arrow-right" size={20} color={colors.primary} />
          </Pressable>
          <Text style={[styles.navTitle, { color: colors.primary }]}>ورد اليوم</Text>
          <View style={{ width: 42 }} />
        </View>
        <View style={[styles.categoryHero, { backgroundColor: category.color }]}>
          <View style={styles.heroIcon}><Feather name={category.icon as keyof typeof Feather.glyphMap} size={24} color={category.color} /></View>
          <Text style={styles.heroTitle}>{category.title}</Text>
          <Text style={styles.heroSubtitle}>{category.subtitle}</Text>
          <View style={styles.heroMeta}>
            <Text style={styles.heroMetaText}>{completed} من {items.length} أذكار مكتملة</Text>
            <ProgressRing value={items.length ? completed / items.length : 0} label="" compact />
          </View>
        </View>
        <View style={styles.list}>{items.map((item) => <DhikrCard key={item.id} item={item} />)}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  nav: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 17 },
  back: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  navTitle: { fontSize: 16, fontWeight: '700' },
  categoryHero: { marginHorizontal: 18, borderRadius: 25, padding: 20, alignItems: 'flex-end' },
  heroIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#FFFDF8', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  heroTitle: { color: '#FFFDF8', fontSize: 25, fontWeight: '700' },
  heroSubtitle: { color: '#F4F0E7', fontSize: 13, marginTop: 5 },
  heroMeta: { width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 19 },
  heroMetaText: { color: '#F4F0E7', fontSize: 12 },
  list: { paddingHorizontal: 18, gap: 13, marginTop: 18 },
  pressed: { opacity: 0.72 },
});

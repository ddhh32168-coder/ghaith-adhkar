import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories, adhkar } from '@/data/adhkar';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';
import { ProgressRing } from '@/components/ProgressRing';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'صباح الخير';
  if (hour < 18) return 'نهارك طيب';
  return 'مساء الخير';
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedCount, totalCount, getDhikrProgress, isReady } = useAdhkar();
  const progress = totalCount ? completedCount / totalCount : 0;
  const featured = adhkar[3];
  const featuredProgress = getDhikrProgress(featured.id);

  if (!isReady) {
    return <View style={[styles.loading, { backgroundColor: colors.background }]}><Text style={{ color: colors.mutedForeground }}>جارٍ تجهيز أذكارك...</Text></View>;
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 110 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.mutedForeground }]}>{getGreeting()}</Text>
            <Text style={[styles.title, { color: colors.primary }]}>أهلاً بك في غيث</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="الإعدادات"
            onPress={() => router.push('/settings')}
            style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
          >
            <Feather name="sliders" size={20} color={colors.primary} />
          </Pressable>
        </View>

        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>وردك اليومي</Text>
            <Text style={styles.heroTitle}>خطوة صغيرة،{'\n'}طمأنينة كبيرة</Text>
            <Text style={styles.heroDescription}>اجعل لسانك رطباً بذكر الله</Text>
          </View>
          <ProgressRing value={progress} label={`${completedCount} من ${totalCount}`} />
          <View style={styles.heroGlow} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>ماذا تقرأ اليوم؟</Text>
          <Text style={[styles.sectionHint, { color: colors.mutedForeground }]}>اختر وردك</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {categories.map((category) => (
            <Pressable
              key={category.slug}
              onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: category.slug } })}
              style={({ pressed }) => [styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}18` }]}>
                <Feather name={category.icon as keyof typeof Feather.glyphMap} size={21} color={category.color} />
              </View>
              <Text style={[styles.categoryTitle, { color: colors.primary }]}>{category.title.replace('أذكار ', '')}</Text>
              <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>{category.subtitle}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>ورد مقترح</Text>
          <Pressable onPress={() => router.push({ pathname: '/category/[slug]', params: { slug: 'morning' } })}>
            <Text style={[styles.link, { color: colors.accentForeground }]}>عرض الكل</Text>
          </Pressable>
        </View>
        <View style={[styles.featured, { backgroundColor: colors.accent }]}>
          <View style={styles.featuredTop}>
            <View style={[styles.featuredIcon, { backgroundColor: colors.card }]}>
              <Feather name="sun" size={18} color={colors.accentForeground} />
            </View>
            <Text style={[styles.featuredLabel, { color: colors.accentForeground }]}>تسبيح الصباح</Text>
          </View>
          <Text style={[styles.featuredText, { color: colors.primary }]}>{featured.text}</Text>
          <View style={styles.featuredBottom}>
            <Text style={[styles.featuredSource, { color: colors.mutedForeground }]}>{featured.source}</Text>
            <ProgressRing value={featuredProgress / featured.target} label={`${featuredProgress}/${featured.target}`} compact />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  greeting: { fontSize: 13, textAlign: 'right', marginBottom: 4 },
  title: { fontSize: 25, fontWeight: '700', textAlign: 'right' },
  iconButton: { width: 42, height: 42, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { marginHorizontal: 18, borderRadius: 28, minHeight: 174, padding: 22, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  heroCopy: { alignItems: 'flex-end', flex: 1, marginRight: 18 },
  heroEyebrow: { color: '#CDE1D7', fontSize: 12, marginBottom: 8 },
  heroTitle: { color: '#FFFDF8', fontSize: 23, lineHeight: 31, fontWeight: '700', textAlign: 'right' },
  heroDescription: { color: '#AFCDBD', fontSize: 12, marginTop: 10 },
  heroGlow: { position: 'absolute', width: 140, height: 140, borderRadius: 70, backgroundColor: '#2E76A8', left: -58, bottom: -74 },
  sectionHeader: { paddingHorizontal: 22, marginTop: 28, marginBottom: 13, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionHint: { fontSize: 12 },
  link: { fontSize: 13, fontWeight: '700' },
  categoryList: { paddingHorizontal: 18, gap: 10 },
  categoryCard: { width: 138, minHeight: 132, borderRadius: 19, padding: 14, borderWidth: 1, alignItems: 'flex-end' },
  categoryIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 12 },
  categoryTitle: { fontSize: 14, fontWeight: '700', textAlign: 'right' },
  categorySubtitle: { fontSize: 10, marginTop: 5, textAlign: 'right' },
  featured: { marginHorizontal: 18, borderRadius: 23, padding: 18, gap: 14 },
  featuredTop: { flexDirection: 'row-reverse', alignItems: 'center', gap: 9 },
  featuredIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  featuredLabel: { fontSize: 13, fontWeight: '700' },
  featuredText: { fontSize: 18, lineHeight: 33, textAlign: 'right', writingDirection: 'rtl' },
  featuredBottom: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  featuredSource: { fontSize: 11 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
});

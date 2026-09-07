import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSurahStartPage, quran, QuranSurah } from '@/data/quran';
import { useColors } from '@/hooks/useColors';

export default function QuranScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return quran;
    return quran.filter((surah) => surah.name.includes(query) || surah.transliteration.toLowerCase().includes(query) || String(surah.id) === query);
  }, [search]);

  const renderSurah = ({ item, index }: { item: QuranSurah; index: number }) => (
    <Pressable
      testID={`surah-${item.id}`}
      accessibilityRole="button"
      accessibilityLabel={`سورة ${item.name}`}
      onPress={() => router.push({ pathname: '/quran/[id]', params: { id: String(item.id) } })}
      style={({ pressed }) => [styles.surahCard, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
    >
      <View style={[styles.number, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.numberText, { color: colors.primary }]}>{item.id}</Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={[styles.surahName, { color: colors.primary }]}>{item.name}</Text>
        <Text style={[styles.surahMeta, { color: colors.mutedForeground }]}>{item.type === 'meccan' ? 'مكية' : 'مدنية'} · {item.total_verses} آية · ص {getSurahStartPage(item.id)}</Text>
      </View>
      <Feather name="chevron-left" size={19} color={colors.mutedForeground} />
    </Pressable>
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={{ paddingTop: insets.top + 18 }}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>نورٌ بين يديك</Text>
            <Text style={[styles.title, { color: colors.primary }]}>القرآن الكريم</Text>
          </View>
          <View style={[styles.headerIcon, { backgroundColor: colors.accent }]}><Feather name="book-open" size={22} color={colors.accentForeground} /></View>
        </View>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.heroIcon}><Feather name="star" size={18} color={colors.primary} /></View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>اقرأ بقلب حاضر</Text>
            <Text style={styles.heroText}>القرآن الكريم كاملاً، سورةً سورة، دون الحاجة إلى اتصال.</Text>
          </View>
        </View>
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={18} color={colors.mutedForeground} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="ابحث عن سورة"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.primary }]}
            textAlign="right"
            returnKeyType="search"
          />
        </View>
      </View>
      <FlatList
        data={filtered}
        renderItem={renderSurah}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={[styles.listTitle, { color: colors.mutedForeground }]}>{filtered.length === 114 ? 'فهرس السور · ١١٤ سورة' : `${filtered.length} سورة`}</Text>}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.mutedForeground }]}>لا توجد سورة بهذا الاسم</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 19 },
  eyebrow: { fontSize: 13, textAlign: 'right', marginBottom: 4 },
  title: { fontSize: 27, fontWeight: '700', textAlign: 'right' },
  headerIcon: { width: 45, height: 45, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  hero: { marginHorizontal: 18, minHeight: 104, borderRadius: 23, padding: 17, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  heroIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  heroCopy: { flex: 1, alignItems: 'flex-end' },
  heroTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', textAlign: 'right' },
  heroText: { color: '#D9F0FF', fontSize: 11, lineHeight: 18, marginTop: 5, textAlign: 'right' },
  searchBox: { marginHorizontal: 18, marginTop: 14, minHeight: 48, borderRadius: 16, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row-reverse', alignItems: 'center', gap: 9 },
  searchInput: { flex: 1, fontSize: 13, height: 46 },
  list: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 105, gap: 10 },
  listTitle: { fontSize: 12, textAlign: 'right', marginBottom: 2 },
  surahCard: { minHeight: 67, borderRadius: 18, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  number: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 13, fontWeight: '700' },
  surahInfo: { flex: 1, alignItems: 'flex-end' },
  surahName: { fontSize: 17, fontWeight: '700', textAlign: 'right' },
  surahMeta: { fontSize: 11, marginTop: 4, textAlign: 'right' },
  pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  empty: { textAlign: 'center', paddingTop: 35, fontSize: 13 },
});
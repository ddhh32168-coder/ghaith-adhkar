import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPage, getSurah, getSurahStartPage, quranPages } from '@/data/quran';
import { useColors } from '@/hooks/useColors';

export default function QuranReaderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const surah = getSurah(id);
  const [page, setPage] = useState(() => getSurahStartPage(id));
  const [fontSize, setFontSize] = useState(22);
  const currentPage = useMemo(() => getPage(page), [page]);
  const currentVerses = currentPage.verses;
  const pageIndex = Math.max(0, quranPages.findIndex((item) => item.page === page));
  const previousPage = quranPages[pageIndex - 1]?.page;
  const nextPage = quranPages[pageIndex + 1]?.page;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 15, paddingBottom: 35 }}>
        <View style={styles.nav}>
          <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="رجوع" style={({ pressed }) => [styles.back, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}>
            <Feather name="arrow-right" size={20} color={colors.primary} />
          </Pressable>
          <Text style={[styles.navTitle, { color: colors.primary }]}>القرآن الكريم</Text>
          <View style={{ width: 42 }} />
        </View>
        <View style={[styles.surahHeader, { backgroundColor: colors.primary }]}>
          <View style={[styles.headerBadge, { backgroundColor: colors.accent }]}><Text style={[styles.headerBadgeText, { color: colors.accentForeground }]}>{surah.id}</Text></View>
          <Text style={styles.surahName}>{surah.name}</Text>
          <Text style={styles.surahMeta}>{surah.type === 'meccan' ? 'مكية' : 'مدنية'} · {surah.total_verses} آيات</Text>
        </View>
        <View style={[styles.readerToolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.toolbarGroup}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="تصغير الخط"
              disabled={fontSize <= 18}
              onPress={() => setFontSize((current) => Math.max(18, current - 2))}
              style={({ pressed }) => [styles.fontButton, { backgroundColor: colors.secondary }, pressed && styles.pressed, fontSize <= 18 && styles.disabled]}
            >
              <Feather name="minus" size={16} color={colors.primary} />
            </Pressable>
            <Text style={[styles.toolbarLabel, { color: colors.mutedForeground }]}>حجم الخط</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="تكبير الخط"
              disabled={fontSize >= 30}
              onPress={() => setFontSize((current) => Math.min(30, current + 2))}
              style={({ pressed }) => [styles.fontButton, { backgroundColor: colors.secondary }, pressed && styles.pressed, fontSize >= 30 && styles.disabled]}
            >
              <Feather name="plus" size={16} color={colors.primary} />
            </Pressable>
          </View>
          <Text style={[styles.pageLabel, { color: colors.primary }]}>صفحة {page} من ٦٠٤</Text>
        </View>
        <View style={[styles.mushafPage, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.pageOrnament}>
            <Text style={[styles.pageMeta, { color: colors.mutedForeground }]}>الجزء {currentPage.juz} · الحزب {Math.ceil(currentPage.hizbQuarter / 4)}</Text>
          </View>
          {currentVerses.map((verse) => (
            <View key={`${verse.surahId}-${verse.id}`} style={styles.verse}>
              {verse.id === 1 && verse.surahId !== surah.id ? <Text style={[styles.surahBreak, { color: colors.primary }]}>{verse.surahName}</Text> : null}
              <Text style={[styles.verseText, { color: colors.foreground, fontSize, lineHeight: Math.round(fontSize * 1.9) }]}>{verse.text} <Text style={[styles.ayahMark, { color: colors.accentForeground }]}>۝{verse.id}</Text></Text>
            </View>
          ))}
        </View>
        <View style={styles.pagination}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="الصفحة التالية"
            disabled={!nextPage}
            onPress={() => nextPage && setPage(nextPage)}
            style={({ pressed }) => [styles.pageButton, { backgroundColor: colors.primary }, pressed && styles.pressed, !nextPage && styles.disabled]}
          >
            <Text style={styles.pageButtonText}>التالية</Text>
            <Feather name="chevron-left" size={17} color="#FFFFFF" />
          </Pressable>
          <Text style={[styles.pageCounter, { color: colors.mutedForeground }]}>{page} / 604</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="الصفحة السابقة"
            disabled={!previousPage}
            onPress={() => previousPage && setPage(previousPage)}
            style={({ pressed }) => [styles.pageButton, { backgroundColor: colors.secondary }, pressed && styles.pressed, !previousPage && styles.disabled]}
          >
            <Feather name="chevron-right" size={17} color={colors.primary} />
            <Text style={[styles.pageButtonText, { color: colors.primary }]}>السابقة</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  nav: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 17 },
  back: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  navTitle: { fontSize: 16, fontWeight: '700' },
  surahHeader: { marginHorizontal: 18, borderRadius: 24, padding: 22, alignItems: 'center' },
  headerBadge: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  headerBadgeText: { fontSize: 15, fontWeight: '700' },
  surahName: { color: '#FFFFFF', fontSize: 30, fontWeight: '700' },
  surahMeta: { color: '#D9F0FF', fontSize: 12, marginTop: 6 },
  readerToolbar: { marginHorizontal: 18, marginTop: 14, minHeight: 57, borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  toolbarGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fontButton: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  toolbarLabel: { fontSize: 11 },
  pageLabel: { fontSize: 12, fontWeight: '700' },
  basmala: { marginHorizontal: 18, marginTop: 12, borderRadius: 19, borderWidth: 1, padding: 17, alignItems: 'center' },
  basmalaText: { fontSize: 19, textAlign: 'center' },
  mushafPage: { marginHorizontal: 18, marginTop: 12, borderRadius: 6, borderWidth: 1, paddingHorizontal: 19, paddingVertical: 22, minHeight: 570 },
  pageOrnament: { borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#D9EAF4', paddingVertical: 7, marginBottom: 8 },
  pageMeta: { fontSize: 10, textAlign: 'center' },
  verse: { paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: '#EAF3F8' },
  surahBreak: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  verseText: { flex: 1, textAlign: 'right', writingDirection: 'rtl' },
  ayahMark: { fontSize: 14 },
  pagination: { marginHorizontal: 18, marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pageButton: { minWidth: 105, height: 42, borderRadius: 14, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pageButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pageCounter: { fontSize: 12, fontWeight: '700' },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.42 },
});
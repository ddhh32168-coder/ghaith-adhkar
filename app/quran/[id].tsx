import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPage, getSurahStartPage, quranPages } from '@/data/quran';
import { useColors } from '@/hooks/useColors';

export default function QuranReaderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [page, setPage] = useState(() => getSurahStartPage(id));
  const [fontSize, setFontSize] = useState(22);
  const currentPage = useMemo(() => getPage(page), [page]);
  const currentVerses = currentPage.verses;
  const pageIndex = Math.max(0, quranPages.findIndex((item) => item.page === page));
  const previousPage = quranPages[pageIndex - 1]?.page;
  const nextPage = quranPages[pageIndex + 1]?.page;
  const toArabicDigits = (value: number) => String(value).replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);

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
          <Text style={[styles.pageLabel, { color: colors.primary }]}>صفحة {toArabicDigits(page)} من ٦٠٤</Text>
        </View>
        <View style={[styles.mushafPage, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.mushafTopBorder}>
            <Text style={[styles.pageMeta, { color: colors.mutedForeground }]}>الجزء {toArabicDigits(currentPage.juz)} · الحزب {toArabicDigits(Math.ceil(currentPage.hizbQuarter / 4))}</Text>
          </View>
          {currentVerses.map((verse) => (
            <React.Fragment key={`${verse.surahId}-${verse.id}`}>
              {verse.id === 1 ? (
                <View style={styles.surahHeading}>
                  <Text style={[styles.surahBreak, { color: colors.foreground }]}>{verse.surahName}</Text>
                  {verse.surahId !== 9 && verse.surahId !== 1 ? <Text style={[styles.basmalaText, { color: colors.foreground }]}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text> : null}
                </View>
              ) : null}
              {verse.surahId === 1 && verse.id === 1 ? (
                <Text style={[styles.basmalaText, { color: colors.foreground, fontSize: fontSize - 1, lineHeight: Math.round(fontSize * 1.8) }]}>{verse.text}</Text>
              ) : (
                <Text style={[styles.verseText, { color: colors.foreground, fontSize, lineHeight: Math.round(fontSize * 1.95) }]}>
                  {verse.text} <Text style={styles.ayahMark}>﴿{toArabicDigits(verse.surahId === 1 ? verse.id - 1 : verse.id)}﴾</Text>
                </Text>
              )}
            </React.Fragment>
          ))}
          <View style={styles.mushafBottomBorder}>
            <Text style={[styles.pageNumber, { color: colors.mutedForeground }]}>{toArabicDigits(page)}</Text>
          </View>
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
  readerToolbar: { marginHorizontal: 18, marginTop: 14, minHeight: 57, borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  toolbarGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fontButton: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  toolbarLabel: { fontSize: 11 },
  pageLabel: { fontSize: 12, fontWeight: '700' },
  mushafPage: { marginHorizontal: 18, marginTop: 12, borderRadius: 2, borderWidth: 2, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, minHeight: 640, backgroundColor: '#FFFDF7' },
  mushafTopBorder: { borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#B7A77B', paddingVertical: 6, marginBottom: 16 },
  mushafBottomBorder: { borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#B7A77B', paddingVertical: 6, marginTop: 16, alignItems: 'center' },
  pageMeta: { fontFamily: 'Amiri_400Regular', fontSize: 12, textAlign: 'center' },
  pageNumber: { fontFamily: 'Amiri_400Regular', fontSize: 14 },
  surahHeading: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#B7A77B', marginVertical: 4, paddingVertical: 5, alignItems: 'center' },
  basmalaText: { fontFamily: 'Amiri_400Regular', fontSize: 20, textAlign: 'center', marginTop: 2 },
  surahBreak: { fontFamily: 'Amiri_700Bold', fontSize: 21, textAlign: 'center' },
  verseText: { fontFamily: 'Amiri_400Regular', textAlign: 'right', writingDirection: 'rtl', includeFontPadding: false },
  ayahMark: { fontFamily: 'Amiri_400Regular', fontSize: 16 },
  pagination: { marginHorizontal: 18, marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pageButton: { minWidth: 105, height: 42, borderRadius: 14, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pageButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pageCounter: { fontSize: 12, fontWeight: '700' },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.42 },
});
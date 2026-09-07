import quranJson from './quran.json';

export type QuranVerse = {
  id: number;
  text: string;
  page: number;
  juz: number;
  hizbQuarter: number;
};

export type QuranSurah = {
  id: number;
  name: string;
  transliteration: string;
  type: 'meccan' | 'medinan';
  total_verses: number;
  verses: QuranVerse[];
};

export const quran = quranJson as QuranSurah[];

export type QuranPageVerse = QuranVerse & {
  surahId: number;
  surahName: string;
};

export type QuranPage = {
  page: number;
  juz: number;
  hizbQuarter: number;
  verses: QuranPageVerse[];
};

const pageMap = new Map<number, QuranPage>();

for (const surah of quran) {
  for (const verse of surah.verses) {
    const existing = pageMap.get(verse.page);
    const pageVerse = { ...verse, surahId: surah.id, surahName: surah.name };
    if (existing) {
      existing.verses.push(pageVerse);
    } else {
      pageMap.set(verse.page, {
        page: verse.page,
        juz: verse.juz,
        hizbQuarter: verse.hizbQuarter,
        verses: [pageVerse],
      });
    }
  }
}

export const quranPages = Array.from(pageMap.values()).sort((a, b) => a.page - b.page);

export function getSurah(id: string | number | undefined) {
  const surahId = Number(id);
  return quran.find((surah) => surah.id === surahId) ?? quran[0];
}

export function getSurahStartPage(id: string | number | undefined) {
  return getSurah(id).verses[0]?.page ?? 1;
}

export function getPage(page: number) {
  return quranPages.find((item) => item.page === page) ?? quranPages[0];
}
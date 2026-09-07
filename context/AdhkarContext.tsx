import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { adhkar } from '@/data/adhkar';

type Progress = Record<string, number>;

type AdhkarContextValue = {
  progress: Progress;
  favorites: string[];
  tasbeehCount: number;
  isReady: boolean;
  completedCount: number;
  totalCount: number;
  incrementDhikr: (id: string) => void;
  resetDhikr: (id: string) => void;
  toggleFavorite: (id: string) => void;
  incrementTasbeeh: () => void;
  resetTasbeeh: () => void;
  getDhikrProgress: (id: string) => number;
  isFavorite: (id: string) => boolean;
  resetDay: () => void;
};

const STORAGE_KEYS = {
  progress: '@adhkar/progress',
  favorites: '@adhkar/favorites',
  tasbeeh: '@adhkar/tasbeeh',
};

const AdhkarContext = createContext<AdhkarContextValue | null>(null);

export function AdhkarProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadState() {
      try {
        const [storedProgress, storedFavorites, storedTasbeeh] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.progress),
          AsyncStorage.getItem(STORAGE_KEYS.favorites),
          AsyncStorage.getItem(STORAGE_KEYS.tasbeeh),
        ]);
        if (storedProgress) setProgress(JSON.parse(storedProgress) as Progress);
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites) as string[]);
        if (storedTasbeeh) setTasbeehCount(Number(storedTasbeeh));
      } catch {
        // A fresh local state is a safe fallback if storage is unavailable.
      } finally {
        setIsReady(true);
      }
    }
    void loadState();
  }, []);

  const persistProgress = (next: Progress) => {
    setProgress(next);
    void AsyncStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(next));
  };

  const incrementDhikr = (id: string) => {
    const item = adhkar.find((dhikr) => dhikr.id === id);
    if (!item) return;
    const current = progress[id] ?? 0;
    if (current >= item.target) return;
    const next = { ...progress, [id]: current + 1 };
    persistProgress(next);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const resetDhikr = (id: string) => {
    const next = { ...progress };
    delete next[id];
    persistProgress(next);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
      void Haptics.selectionAsync();
      return next;
    });
  };

  const incrementTasbeeh = () => {
    setTasbeehCount((current) => {
      const next = current + 1;
      void AsyncStorage.setItem(STORAGE_KEYS.tasbeeh, String(next));
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return next;
    });
  };

  const resetTasbeeh = () => {
    setTasbeehCount(0);
    void AsyncStorage.setItem(STORAGE_KEYS.tasbeeh, '0');
  };

  const resetDay = () => {
    setProgress({});
    void AsyncStorage.setItem(STORAGE_KEYS.progress, '{}');
  };

  const value = useMemo<AdhkarContextValue>(() => {
    const completedCount = adhkar.filter((item) => (progress[item.id] ?? 0) >= item.target).length;
    return {
      progress,
      favorites,
      tasbeehCount,
      isReady,
      completedCount,
      totalCount: adhkar.length,
      incrementDhikr,
      resetDhikr,
      toggleFavorite,
      incrementTasbeeh,
      resetTasbeeh,
      getDhikrProgress: (id: string) => progress[id] ?? 0,
      isFavorite: (id: string) => favorites.includes(id),
      resetDay,
    };
  }, [favorites, isReady, progress, tasbeehCount]);

  return <AdhkarContext.Provider value={value}>{children}</AdhkarContext.Provider>;
}

export function useAdhkar() {
  const context = useContext(AdhkarContext);
  if (!context) throw new Error('useAdhkar must be used within AdhkarProvider');
  return context;
}

import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Dhikr } from '@/data/adhkar';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';

export function DhikrCard({ item }: { item: Dhikr }) {
  const colors = useColors();
  const { getDhikrProgress, incrementDhikr, isFavorite, toggleFavorite } = useAdhkar();
  const count = getDhikrProgress(item.id);
  const done = count >= item.target;

  const handleIncrement = () => {
    if (!done) {
      incrementDhikr(item.id);
      void Haptics.selectionAsync();
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <View style={[styles.indexDot, { backgroundColor: done ? colors.accentForeground : colors.secondary }]}>
          {done ? <Feather name="check" size={13} color={colors.primaryForeground} /> : <Text style={[styles.indexText, { color: colors.primary }]}>ذ</Text>}
        </View>
        <View style={styles.sourceWrap}>
          <Text style={[styles.source, { color: colors.mutedForeground }]}>{item.source}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isFavorite(item.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            onPress={() => toggleFavorite(item.id)}
            hitSlop={10}
            style={({ pressed }) => [styles.favorite, pressed && styles.pressed]}
          >
            <Feather name="heart" size={19} color={isFavorite(item.id) ? colors.accentForeground : colors.mutedForeground} />
          </Pressable>
        </View>
      </View>
      <Text style={[styles.text, { color: colors.foreground }]}>{item.text}</Text>
      {item.note ? <Text style={[styles.note, { color: colors.mutedForeground }]}>{item.note}</Text> : null}
      <View style={styles.actionRow}>
        <View style={styles.progressInfo}>
          <Text style={[styles.count, { color: colors.primary }]}>{count}</Text>
          <Text style={[styles.target, { color: colors.mutedForeground }]}>/ {item.target}</Text>
        </View>
        <Pressable
          testID={`dhikr-${item.id}`}
          accessibilityRole="button"
          accessibilityLabel={done ? 'تم إكمال الذكر' : 'تكرار الذكر'}
          onPress={handleIncrement}
          style={({ pressed }) => [
            styles.repeatButton,
            { backgroundColor: done ? colors.secondary : colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Feather name={done ? 'check' : 'plus'} size={16} color={done ? colors.primary : colors.primaryForeground} />
          <Text style={[styles.repeatText, { color: done ? colors.primary : colors.primaryForeground }]}>
            {done ? 'تم' : 'كرّر'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, borderWidth: 1, padding: 18, gap: 15 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  indexDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  indexText: { fontSize: 14, fontWeight: '700' },
  sourceWrap: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  source: { fontSize: 11, textAlign: 'right' },
  favorite: { padding: 2 },
  text: { fontSize: 20, lineHeight: 38, textAlign: 'right', writingDirection: 'rtl' },
  note: { fontSize: 12, lineHeight: 20, textAlign: 'right', writingDirection: 'rtl' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressInfo: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  count: { fontSize: 20, fontWeight: '700' },
  target: { fontSize: 12 },
  repeatButton: { minWidth: 92, height: 40, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  repeatText: { fontSize: 14, fontWeight: '700' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';

export default function TasbeehScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { tasbeehCount, incrementTasbeeh, resetTasbeeh } = useAdhkar();
  const currentRound = tasbeehCount % 33;
  const completedRounds = Math.floor(tasbeehCount / 33);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 18 }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>لحظة هدوء</Text>
          <Text style={[styles.title, { color: colors.primary }]}>المسبحة</Text>
        </View>
        <Pressable onPress={resetTasbeeh} accessibilityRole="button" accessibilityLabel="تصفير العداد" style={({ pressed }) => [styles.reset, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}>
          <Feather name="rotate-ccw" size={17} color={colors.mutedForeground} />
        </Pressable>
      </View>
      <View style={[styles.quote, { backgroundColor: colors.accent }]}>
        <Feather name="volume-2" size={18} color={colors.accentForeground} />
        <Text style={[styles.quoteText, { color: colors.primary }]}>ألا بذكر الله تطمئن القلوب</Text>
      </View>
      <View style={styles.counterArea}>
        <View style={[styles.outerRing, { borderColor: colors.border }]}>
          <View style={[styles.innerRing, { borderColor: colors.accent }]}>
            <Text style={[styles.counter, { color: colors.primary }]}>{tasbeehCount}</Text>
            <Text style={[styles.counterLabel, { color: colors.mutedForeground }]}>تسبيحة</Text>
          </View>
        </View>
        <Text style={[styles.roundLabel, { color: colors.mutedForeground }]}>الدورة {completedRounds + 1} · {currentRound}/33</Text>
        <Pressable
          testID="tasbeeh-button"
          accessibilityRole="button"
          accessibilityLabel="اضغط للتسبيح"
          onPress={incrementTasbeeh}
          style={({ pressed }) => [styles.tasbeehButton, { backgroundColor: colors.primary }, pressed && styles.buttonPressed]}
        >
          <Text style={styles.tasbeehButtonText}>سبّح</Text>
          <Feather name="plus" size={22} color={colors.primaryForeground} />
        </Pressable>
      </View>
      <View style={[styles.tip, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.tipIcon, { backgroundColor: colors.secondary }]}><Feather name="info" size={15} color={colors.primary} /></View>
        <Text style={[styles.tipText, { color: colors.mutedForeground }]}>اضغط على الزر مع كل تسبيحة، وسيبقى عدادك محفوظاً حتى تعود.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { fontSize: 13, textAlign: 'right', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'right' },
  reset: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  quote: { height: 52, borderRadius: 16, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 9 },
  quoteText: { fontSize: 15, fontWeight: '600' },
  counterArea: { alignItems: 'center', marginTop: 38 },
  outerRing: { width: 242, height: 242, borderRadius: 121, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  innerRing: { width: 208, height: 208, borderRadius: 104, borderWidth: 6, alignItems: 'center', justifyContent: 'center' },
  counter: { fontSize: 56, fontWeight: '700' },
  counterLabel: { fontSize: 14, marginTop: 3 },
  roundLabel: { fontSize: 12, marginTop: 18 },
  tasbeehButton: { width: 176, height: 56, borderRadius: 19, marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  tasbeehButtonText: { color: '#FFFDF8', fontSize: 17, fontWeight: '700' },
  tip: { marginTop: 'auto', marginBottom: 105, borderRadius: 17, borderWidth: 1, padding: 14, flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  tipIcon: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tipText: { flex: 1, fontSize: 12, lineHeight: 19, textAlign: 'right' },
  pressed: { opacity: 0.75 },
  buttonPressed: { opacity: 0.83, transform: [{ scale: 0.97 }] },
});

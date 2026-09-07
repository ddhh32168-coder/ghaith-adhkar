import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type ProgressRingProps = {
  value: number;
  label: string;
  compact?: boolean;
};

export function ProgressRing({ value, label, compact = false }: ProgressRingProps) {
  const colors = useColors();
  const percentage = Math.min(100, Math.round(value * 100));
  return (
    <View style={[styles.wrapper, compact && styles.compactWrapper]}>
      <View
        style={[
          styles.ring,
          compact && styles.compactRing,
          { borderColor: colors.border, borderTopColor: colors.accentForeground },
          percentage === 100 && { borderColor: colors.accentForeground },
        ]}
      >
        {percentage === 100 ? (
          <Feather name="check" size={compact ? 15 : 21} color={colors.accentForeground} />
        ) : (
          <Text style={[styles.value, compact && styles.compactValue, { color: colors.primary }]}>
            {percentage}%
          </Text>
        )}
      </View>
      <Text style={[styles.label, compact && styles.compactLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 7 },
  compactWrapper: { flexDirection: 'row', gap: 8 },
  ring: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-35deg' }],
  },
  compactRing: { width: 34, height: 34, borderRadius: 17, borderWidth: 4 },
  value: { fontSize: 16, fontWeight: '700', transform: [{ rotate: '35deg' }] },
  compactValue: { fontSize: 10 },
  label: { fontSize: 12, fontWeight: '500' },
  compactLabel: { fontSize: 13 },
});

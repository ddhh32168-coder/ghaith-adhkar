import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdhkar } from '@/context/AdhkarContext';
import { useColors } from '@/hooks/useColors';

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { resetDay } = useAdhkar();
  const confirmReset = () => {
    Alert.alert('بدء يوم جديد', 'سيتم تصفير تقدّم الأذكار فقط، ولن تتأثر المفضلة أو عداد التسبيح.', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'تصفير التقدم', style: 'destructive', onPress: resetDay },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 15, paddingBottom: 40 }}>
        <View style={styles.nav}>
          <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="رجوع" style={({ pressed }) => [styles.back, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}>
            <Feather name="arrow-right" size={20} color={colors.primary} />
          </Pressable>
          <Text style={[styles.title, { color: colors.primary }]}>الإعدادات</Text>
          <View style={{ width: 42 }} />
        </View>
        <View style={[styles.about, { backgroundColor: colors.primary }]}>
          <View style={styles.aboutMark}><Feather name="moon" size={20} color={colors.accentForeground} /></View>
          <Text style={styles.aboutTitle}>غيث</Text>
          <Text style={styles.aboutText}>رفيقك الهادئ في كل يوم</Text>
        </View>
        <Text style={[styles.section, { color: colors.mutedForeground }]}>اليوم</Text>
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable onPress={confirmReset} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.accent }]}><Feather name="refresh-cw" size={17} color={colors.accentForeground} /></View>
            <Text style={[styles.rowText, { color: colors.primary }]}>بدء يوم جديد</Text>
            <Feather name="chevron-left" size={18} color={colors.mutedForeground} />
          </Pressable>
        </View>
        <Text style={[styles.section, { color: colors.mutedForeground }]}>عن التطبيق</Text>
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: colors.secondary }]}><Feather name="info" size={17} color={colors.primary} /></View>
            <Text style={[styles.rowText, { color: colors.primary }]}>نسخة التطبيق</Text>
            <Text style={[styles.version, { color: colors.mutedForeground }]}>١.٠</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  nav: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  back: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  about: { marginHorizontal: 20, borderRadius: 23, padding: 22, alignItems: 'flex-end' },
  aboutMark: { width: 42, height: 42, borderRadius: 15, backgroundColor: '#DCEFFC', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  aboutTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '700' },
  aboutText: { color: '#D9F0FF', fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 22, marginTop: 28, marginBottom: 10, fontSize: 12, textAlign: 'right' },
  group: { marginHorizontal: 20, borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  row: { minHeight: 62, paddingHorizontal: 15, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  rowIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1, fontSize: 14, fontWeight: '600', textAlign: 'right' },
  version: { fontSize: 12 },
  pressed: { opacity: 0.72 },
});
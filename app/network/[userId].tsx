import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '@/components/ui';
import { MeritPassport } from '@/components/passport/MeritPassport';
import { colors, spacing, radii, trackColors } from '@/config/theme';
import { ArrowLeft, MessageSquare, UserPlus } from 'lucide-react-native';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [introSent, setIntroSent] = useState(false);

  useEffect(() => {
    // Mock load
    setTimeout(() => {
      setUser({
        displayName: 'Sarah Mitchell',
        track: 'founder',
        apexScore: 142,
        momentumScore: 24,
        college: 'Stanford University',
        city: 'San Francisco, CA',
        bio: 'Building a community platform for top students. Previously interned at Stripe.',
        photoURL: null,
        achievements: ['MVP Launch', 'Y Combinator F25', '3x Pod Champion'],
      });
      setLoading(false);
    }, 800);
  }, [userId]);

  const handleIntroRequest = () => {
    router.push(`/network/intro-request?targetUserId=${userId}&targetName=${encodeURIComponent(user?.displayName || '')}`);
  };

  if (loading || !user) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.light.accentRed} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingSmall">Member Profile</Typography>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MeritPassport user={user} isVerified style={styles.passport} />

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>About</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.bio}>
            {user.bio}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Achievements</Typography>
          <View style={styles.achievements}>
            {user.achievements?.map((ach: string, idx: number) => (
              <View key={idx} style={styles.achievementPill}>
                <Typography variant="labelSmall" color={colors.light.accentGold}>
                  🏆 {ach}
                </Typography>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title={introSent ? 'Intro Request Sent' : 'Request Warm Intro'}
            icon={<UserPlus size={18} color="#FFF" />}
            onPress={handleIntroRequest}
            disabled={introSent}
            style={styles.actionBtn}
          />
          
          <Button
            title="Start Chat"
            variant="outline"
            icon={<MessageSquare size={18} color={colors.light.text} />}
            onPress={() => Alert.alert('Chat', 'Trust-gated chat requires intro acceptance first.')}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bg,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
    backgroundColor: colors.light.bg,
  },
  backBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  passport: {
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  bio: {
    lineHeight: 24,
  },
  achievements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  achievementPill: {
    backgroundColor: `${colors.light.accentGold}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionBtn: {
    shadowColor: 'transparent',
  },
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '@/components/ui';
import { PodService, Pod } from '@/services/pod.service';
import { useAuthContext } from '@/providers/AuthProvider';
import { colors, spacing, radii } from '@/config/theme';
import { Users, CheckCircle, Clock, MessageCircle } from 'lucide-react-native';

export default function MyPodScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [pod, setPod] = useState<Pod | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPod();
  }, [user]);

  const loadPod = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // For now mock:
      setPod({
        id: 'pod-alpha-7',
        name: 'Alpha-7',
        track: 'founder',
        captainId: 'u1',
        memberIds: [user.uid, 'u2', 'u3', 'u4', 'u5'],
        memberCount: 5,
        status: 'active',
        weeklyPrompt: 'What was your biggest win this week, and what is blocking your main goal?',
        healthScore: 92,
        streakWeeks: 4,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.light.accentRed} />
      </View>
    );
  }

  if (!pod) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Users color={colors.light.textMuted} size={48} style={{ marginBottom: 16 }} />
          <Typography variant="headingMedium" style={{ marginBottom: 8 }}>No Active Pod</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted} align="center" style={{ marginBottom: 24 }}>
            You haven't been assigned to a pod yet. Pods are formed every Sunday.
          </Typography>
          <Button title="Learn about Pods" variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="displayMedium" style={styles.title}>Your Pod</Typography>
        </View>

        <GlassCard style={styles.card} containerStyle={{ marginBottom: spacing.xl }}>
          <View style={styles.podHeader}>
            <View style={styles.podAvatar}>
              <Users color={colors.light.textInverse} size={24} />
            </View>
            <View>
              <Typography variant="headingMedium">{pod.name}</Typography>
              <Typography variant="bodyMedium" color={colors.light.accentTeal} style={{ textTransform: 'capitalize' }}>
                {pod.track} Track • {pod.memberCount} Members
              </Typography>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Typography variant="labelSmall" color={colors.light.textMuted}>HEALTH</Typography>
              <Typography variant="headingSmall" color={colors.light.success}>{pod.healthScore}%</Typography>
            </View>
            <View style={styles.statBox}>
              <Typography variant="labelSmall" color={colors.light.textMuted}>STREAK</Typography>
              <Typography variant="headingSmall">🔥 {pod.streakWeeks} wks</Typography>
            </View>
          </View>

          <View style={styles.actions}>
            <Button 
              title="Open Pod Chat" 
              icon={<MessageCircle size={18} color="#FFF" />}
              onPress={() => router.push(`/community/chat/${pod.id}`)} 
              style={{ marginBottom: spacing.md }}
            />
            
            <Button 
              title="Submit Weekly Check-in" 
              variant="secondary"
              icon={<CheckCircle size={18} color={colors.light.text} />}
              onPress={() => router.push(`/pods/checkin?podId=${pod.id}`)} 
            />
          </View>
        </GlassCard>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Weekly Prompt</Typography>
          <GlassCard intensity={20}>
            <Typography variant="bodyMedium" style={{ fontStyle: 'italic' }}>
              "{pod.weeklyPrompt}"
            </Typography>
          </GlassCard>
        </View>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Recent Check-ins</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            Sarah M. and David K. have checked in this week.
          </Typography>
          <Button 
            title="View all check-ins" 
            variant="ghost" 
            style={{ marginTop: spacing.sm }} 
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
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  card: {
    padding: spacing.xl,
  },
  podHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  podAvatar: {
    width: 56,
    height: 56,
    borderRadius: radii.sm,
    backgroundColor: colors.light.accentRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  statBox: {
    gap: 4,
  },
  actions: {
    marginTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});

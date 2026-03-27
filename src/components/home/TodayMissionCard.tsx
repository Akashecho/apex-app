import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, GlassCard, ActionPill } from '../ui';
import { colors, spacing } from '../../config/theme';
import { CheckCircle2, Circle } from 'lucide-react-native';

interface TodayMissionCardProps {
  mission: string;
  isCompleted: boolean;
  onComplete?: () => void;
}

export function TodayMissionCard({ mission, isCompleted, onComplete }: TodayMissionCardProps) {
  return (
    <GlassCard intensity={50} variant="lightStrong" style={styles.card}>
      <View style={styles.header}>
        <Typography variant="labelLarge" color={colors.light.accentRed} style={styles.badge}>
          TODAY'S MISSION
        </Typography>
        <Typography variant="bodySmall" color={colors.light.textMuted}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </Typography>
      </View>

      <Typography variant="headingMedium" style={styles.mission}>
        {mission}
      </Typography>

      <View style={styles.actionRow}>
        <ActionPill 
          label={isCompleted ? 'Mission Accomplished' : 'Mark Complete'}
          active={isCompleted}
          color={colors.light.success}
          icon={isCompleted ? <CheckCircle2 color={colors.light.textInverse} size={16} /> : <Circle color={colors.light.text} size={16} />}
          onPress={onComplete}
        />
        
        {isCompleted && (
          <Typography variant="labelMedium" color={colors.light.success} style={styles.streak}>
            🔥 12 Day Streak
          </Typography>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    letterSpacing: 1,
  },
  mission: {
    marginBottom: spacing.xl,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streak: {
    marginLeft: spacing.md,
  },
});

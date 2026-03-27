import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Typography, GlassCard } from '../ui';
import { colors, spacing, radii } from '../../config/theme';
import { Users, ChevronRight } from 'lucide-react-native';

export function PodPulseCard() {
  // Mock data
  const podName = "Alpha-7";
  const pendingCheckins = 2;
  const unreadMessages = 5;

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.card} containerStyle={styles.container}>
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <Users color={colors.light.accentTeal} size={24} />
            {unreadMessages > 0 && (
              <View style={styles.badge}>
                <Typography variant="labelSmall" color="#FFF" style={styles.badgeText}>
                  {unreadMessages}
                </Typography>
              </View>
            )}
          </View>
          <View style={styles.textContainer}>
            <Typography variant="labelMedium" color={colors.light.textMuted}>
              POD PULSE
            </Typography>
            <Typography variant="headingSmall">
              {podName} Room
            </Typography>
          </View>
        </View>
        
        <View style={styles.rightContent}>
          {pendingCheckins > 0 ? (
            <Typography variant="labelSmall" color={colors.light.warning} style={styles.status}>
              {pendingCheckins} Check-ins Due
            </Typography>
          ) : (
            <Typography variant="labelSmall" color={colors.light.success} style={styles.status}>
              All Checked In
            </Typography>
          )}
          <ChevronRight color={colors.light.textMuted} size={20} />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    backgroundColor: `${colors.light.accentTeal}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.light.accentRed,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.light.bg,
  },
  badgeText: {
    fontSize: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    marginRight: spacing.sm,
  },
});

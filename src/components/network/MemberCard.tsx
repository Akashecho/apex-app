import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, GlassCard } from '../ui';
import { colors, spacing, radii, trackColors } from '../../config/theme';
import { ArrowRight } from 'lucide-react-native';

interface MemberCardProps {
  member: {
    id: string;
    displayName: string;
    college: string;
    track: string;
    city?: string;
    apexScore?: number;
  };
  onPress: () => void;
}

export function MemberCard({ member, onPress }: MemberCardProps) {
  const trackColor = trackColors[member.track] || colors.light.textMuted;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <GlassCard style={styles.card} containerStyle={styles.container}>
        <View style={styles.avatar}>
          <Typography variant="headingMedium" color={colors.light.textInverse}>
            {member.displayName.charAt(0).toUpperCase()}
          </Typography>
        </View>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Typography variant="headingSmall" numberOfLines={1}>{member.displayName}</Typography>
          </View>
          <Typography variant="bodySmall" color={colors.light.textMuted} numberOfLines={1}>
            {member.college}
          </Typography>
          <View style={styles.tags}>
            <View style={[styles.trackPill, { backgroundColor: `${trackColor}15` }]}>
              <Typography variant="labelSmall" color={trackColor} style={{ textTransform: 'capitalize' }}>
                {member.track}
              </Typography>
            </View>
            {member.apexScore !== undefined && (
              <Typography variant="labelSmall" color={colors.light.textMuted} style={{ marginLeft: spacing.sm }}>
                Score: {member.apexScore}
              </Typography>
            )}
          </View>
        </View>

        <ArrowRight color={colors.light.borderMedium} size={20} />
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    backgroundColor: colors.light.accentTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  trackPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
});

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, GlassCard } from '../ui';
import { colors, spacing, radii } from '../../config/theme';
import { Briefcase, ArrowUpRight, Clock } from 'lucide-react-native';

interface OpportunityCardProps {
  title: string;
  company?: string;
  deadlineText?: string;
  tags?: string[];
  type?: string;
}

export function OpportunityCard({ title, company, deadlineText, tags, type }: OpportunityCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.card} containerStyle={styles.container}>
        <View style={styles.header}>
          <Typography variant="labelSmall" color={colors.light.accentRed} style={styles.label}>
            EXPIRING SOON
          </Typography>
          {deadlineText && (
            <View style={styles.deadlineBadge}>
              <Clock color={colors.light.textMuted} size={12} style={{marginRight: 4}} />
              <Typography variant="labelSmall" color={colors.light.textMuted}>
                {deadlineText}
              </Typography>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Briefcase color={colors.light.accentGold} size={24} />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="headingSmall" numberOfLines={2}>
              {title}
            </Typography>
            {company && (
              <Typography variant="bodySmall" color={colors.light.textMuted} style={styles.company}>
                {company}
              </Typography>
            )}
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.tags}>
            {tags?.map(tag => (
              <View key={tag} style={styles.tag}>
                <Typography variant="labelSmall" color={colors.light.textMuted}>{tag}</Typography>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.actionBtn}>
            <Typography variant="labelMedium" color={colors.light.accentRed}>View</Typography>
            <ArrowUpRight color={colors.light.accentRed} size={16} />
          </TouchableOpacity>
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
    padding: spacing.lg,
    backgroundColor: '#FFFFFF', // Slightly less transparent for contrast
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    letterSpacing: 1,
  },
  deadlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  content: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    backgroundColor: `${colors.light.accentGold}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  company: {
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  tag: {
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.xs,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
});

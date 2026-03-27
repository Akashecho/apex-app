import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Typography, GlassCard } from '../ui';
import { colors, spacing, radii } from '../../config/theme';
import { Users, MapPin, Calendar, ChevronRight } from 'lucide-react-native';

interface ChapterNodeProps {
  chapter: {
    id: string;
    name: string;
    type: 'city' | 'campus';
    location: string;
    memberCount: number;
    nextMeetupAt?: string;
  };
  onPress: () => void;
}

export function ChapterNodeCard({ chapter, onPress }: ChapterNodeProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <GlassCard style={styles.card} containerStyle={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Typography variant="headingSmall">{chapter.name}</Typography>
            <View style={styles.typePill}>
              <Typography variant="labelSmall" color={chapter.type === 'city' ? colors.light.accentTeal : colors.light.accentPurple}>
                {chapter.type === 'city' ? 'City' : 'Campus'}
              </Typography>
            </View>
          </View>
          
          <View style={styles.detailsRow}>
            <MapPin color={colors.light.textMuted} size={14} style={styles.icon} />
            <Typography variant="bodySmall" color={colors.light.textMuted} numberOfLines={1} style={{flex: 1}}>
              {chapter.location}
            </Typography>
            
            <Users color={colors.light.textMuted} size={14} style={[styles.icon, { marginLeft: spacing.md }]} />
            <Typography variant="bodySmall" color={colors.light.textMuted}>
              {chapter.memberCount} members
            </Typography>
          </View>
        </View>

        {chapter.nextMeetupAt && (
          <View style={styles.meetupBadge}>
            <Calendar color={colors.light.accentGold} size={14} />
            <Typography variant="labelSmall" color={colors.light.accentGold} style={{ marginLeft: 4 }}>
              Next: {chapter.nextMeetupAt}
            </Typography>
          </View>
        )}
        
        <ChevronRight color={colors.light.borderMedium} size={20} />
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
  infoContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  typePill: {
    marginLeft: spacing.sm,
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  icon: {
    opacity: 0.7,
    marginRight: 4,
  },
  meetupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.light.accentGold}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.xs,
    marginRight: spacing.sm,
  },
});

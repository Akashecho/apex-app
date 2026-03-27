import React from 'react';
import { View, StyleSheet, Image, ViewProps } from 'react-native';
import { Typography } from '../ui';
import { ScoreRing } from './ScoreRing';
import { colors, radii, spacing, shadows } from '../../config/theme';
import { BadgeCheck, Zap, Award } from 'lucide-react-native';

interface MeritPassportProps extends ViewProps {
  user: {
    displayName: string;
    track: string;
    apexScore: number;
    momentumScore: number;
    college: string;
    city: string;
    photoURL?: string | null;
  };
  isVerified?: boolean;
}

export function MeritPassport({ user, isVerified = true, style, ...rest }: MeritPassportProps) {
  return (
    <View style={[styles.card, shadows.medium, style]} {...rest}>
      {/* Paper Texture Background Effect */}
      <View style={styles.texture} />
      
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Typography variant="headingMedium" style={styles.name}>
            {user.displayName}
            {isVerified && (
              <BadgeCheck color={colors.light.accentTeal} size={20} style={styles.verifiedIcon} />
            )}
          </Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            {user.college}
          </Typography>
          <Typography variant="bodySmall" color={colors.light.textMuted}>
            {user.city}
          </Typography>
        </View>

        {user.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </View>

      <View style={styles.scoreSection}>
        <ScoreRing score={user.apexScore} size={140} color={colors.light.accentRed} />
        
        <View style={styles.statsColumn}>
          <View style={styles.statBox}>
            <View style={styles.statIcon}>
              <Zap color={colors.light.accentGold} size={16} />
            </View>
            <View>
              <Typography variant="labelSmall" color={colors.light.textMuted}>MOMENTUM</Typography>
              <Typography variant="headingSmall">+{user.momentumScore}</Typography>
            </View>
          </View>
          
          <View style={styles.statBox}>
            <View style={styles.statIcon}>
              <Award color={colors.light.accentPurple} size={16} />
            </View>
            <View>
              <Typography variant="labelSmall" color={colors.light.textMuted}>TRACK</Typography>
              <Typography variant="headingSmall" style={{ textTransform: 'capitalize' }}>
                {user.track}
              </Typography>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Typography variant="mono" color={colors.light.textMuted} style={styles.serialNumber}>
          ID: APX-{user.displayName.toUpperCase().substring(0,3)}-{user.apexScore.toString().padStart(4, '0')}
        </Typography>
        <Image 
          source={require('../../../assets/icon.png')} 
          style={styles.seal} 
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FBF8F1', // Slightly warmer paper color
    borderRadius: radii.lg,
    padding: spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(219, 168, 90, 0.3)', // subtle gold border
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    // A real app would use an image texture overlay here for skeuomorphism
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing['2xl'],
    zIndex: 1,
  },
  userInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
    marginTop: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radii.sm,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: radii.sm,
    backgroundColor: colors.light.borderSubtle,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    zIndex: 1,
  },
  statsColumn: {
    flex: 1,
    paddingLeft: spacing.xl,
    gap: spacing.lg,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.light.bgSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(12, 16, 28, 0.05)',
    zIndex: 1,
  },
  serialNumber: {
    letterSpacing: 2,
  },
  seal: {
    width: 32,
    height: 32,
    opacity: 0.8,
  },
});

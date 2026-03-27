import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing, typography } from '../../config/theme';
import { Typography } from './Typography';

interface GradientHeroProps extends ViewProps {
  title: string;
  subtitle?: string;
  colors?: readonly [string, string, string] | readonly [string, string];
  height?: number;
}

export function GradientHero({
  title,
  subtitle,
  colors: gradientColors = ['#FDE1C3', '#F9C9B0', '#D9C0F0'],
  height = 300,
  style,
  children,
  ...rest
}: GradientHeroProps) {
  return (
    <LinearGradient
      colors={gradientColors as [string, string, string]}
      style={[styles.container, { height }, style]}
      {...rest}
    >
      <View style={styles.content}>
        <Typography variant="displayLarge" align="center" style={styles.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="headingSmall" align="center" color={colors.light.textMuted} style={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    overflow: 'hidden',
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.light.text,
  },
  subtitle: {
    opacity: 0.8,
  },
});

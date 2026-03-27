import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, radii, spacing, shadows } from '../../config/theme';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  title,
  loading = false,
  icon,
  fullWidth = true,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const getContainerStyle = () => {
    const baseStyle = [styles.base, styles[size], fullWidth && styles.fullWidth];
    
    if (disabled) {
      return [...baseStyle, styles.disabled];
    }
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.light.textMuted;
    switch (variant) {
      case 'primary':
        return colors.light.textInverse;
      case 'secondary':
        return colors.light.text;
      case 'outline':
      case 'ghost':
      default:
        return colors.light.text;
    }
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Typography variant="labelLarge" color={getTextColor()}>
            {title}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  // Sizes
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
    borderRadius: radii.md,
  },
  // Variants
  primary: {
    backgroundColor: colors.light.accentRed,
    ...shadows.glow,
  },
  secondary: {
    backgroundColor: colors.light.bgSoft,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.light.borderMedium,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.light.borderSubtle,
    borderColor: 'transparent',
  },
});

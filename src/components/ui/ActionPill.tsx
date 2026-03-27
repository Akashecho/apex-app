import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../config/theme';
import { Typography } from './Typography';

interface ActionPillProps extends TouchableOpacityProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  color?: string;
  size?: 'sm' | 'md';
}

export function ActionPill({
  label,
  icon,
  active = false,
  color = colors.light.accentRed,
  size = 'md',
  style,
  ...rest
}: ActionPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[size],
        active ? { backgroundColor: color, borderColor: color } : styles.inactive,
        style,
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Typography 
        variant="labelMedium" 
        color={active ? colors.light.textInverse : colors.light.text}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 32,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 40,
  },
  inactive: {
    backgroundColor: 'transparent',
    borderColor: colors.light.borderMedium,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
});

import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../../config/theme';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, style, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="labelMedium" color={colors.light.textMuted} style={styles.label}>
          {label}
        </Typography>
      )}
      
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.light.textMuted}
          {...rest}
        />
      </View>
      
      {error && (
        <Typography variant="labelSmall" color={colors.light.error} style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.inputBg,
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
    borderRadius: radii.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.light.error,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.light.text,
    ...typography.bodyMedium,
  },
  errorText: {
    marginTop: spacing.xs,
  },
});

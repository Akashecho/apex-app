import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, shadows, glass } from '../../config/theme';

interface GlassCardProps extends ViewProps {
  variant?: 'light' | 'lightStrong' | 'dark' | 'darkStrong';
  intensity?: number;
  containerStyle?: ViewStyle;
}

export function GlassCard({
  variant = 'light',
  intensity = 30,
  style,
  containerStyle,
  children,
  ...rest
}: GlassCardProps) {
  const glassStyle = glass[variant];

  return (
    <View style={[styles.container, containerStyle, shadows.soft]}>
      <BlurView
        intensity={intensity}
        style={[
          styles.blur,
          {
            backgroundColor: glassStyle.backgroundColor,
            borderColor: glassStyle.borderColor,
            borderWidth: glassStyle.borderWidth,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  blur: {
    padding: 24,
    borderRadius: radii.lg,
  },
});

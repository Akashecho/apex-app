import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography, colors } from '../../config/theme';

interface TypographyProps extends TextProps {
  variant?: keyof typeof typography;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export function Typography({
  variant = 'bodyMedium',
  color = colors.light.text,
  align = 'left',
  style,
  children,
  ...rest
}: TypographyProps) {
  const variantStyle = typography[variant];
  
  return (
    <Text
      style={[
        variantStyle,
        { color, textAlign: align },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

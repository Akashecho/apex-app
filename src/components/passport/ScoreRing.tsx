import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Typography } from '../ui';
import { colors } from '../../config/theme';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: ViewStyle;
}

export function ScoreRing({ 
  score, 
  size = 120, 
  strokeWidth = 10, 
  color = colors.light.accentGold,
  style 
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Normalize score between 0 and 100 for visual progress, assuming 100 is "max" for now, or adapt as needed.
  const percentage = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="1" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        {/* Background Circle */}
        <Circle
          stroke={colors.light.borderSubtle}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke="url(#gradient)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[styles.textContainer, { width: size, height: size }]}>
        <Typography variant="headingLarge" color={colors.light.text} style={{ fontSize: 28 }}>
          {score}
        </Typography>
        <Typography variant="labelSmall" color={colors.light.textMuted} style={{ marginTop: -4 }}>
          APEX SCORE
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

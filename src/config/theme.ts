// APEX Design System Tokens
// Based on architecture doc section 12

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const colors = {
  light: {
    bg: '#F8F1E7',
    bgSoft: '#F2E6D8',
    surfaceGlass: 'rgba(255, 255, 255, 0.18)',
    surfaceGlassStrong: 'rgba(255, 255, 255, 0.35)',
    borderSubtle: 'rgba(12, 16, 28, 0.06)',
    borderMedium: 'rgba(12, 16, 28, 0.12)',
    text: '#16181D',
    textMuted: '#6B717E',
    textInverse: '#FFFFFF',
    accentRed: '#E3173E',
    accentTeal: '#1C8F80',
    accentGold: '#D1A85A',
    accentPurple: '#6366F1',
    accentPink: '#EC4899',
    success: '#16A34A',
    warning: '#EAB308',
    error: '#DC2626',
    cardBg: '#FFFFFF',
    inputBg: '#FFFFFF',
    tabBarBg: 'rgba(248, 241, 231, 0.95)',
    skeleton: 'rgba(12, 16, 28, 0.06)',
  },
  dark: {
    bg: '#050816',
    bgSoft: '#0B1020',
    surfaceGlass: 'rgba(15, 23, 42, 0.55)',
    surfaceGlassStrong: 'rgba(15, 23, 42, 0.75)',
    borderSubtle: 'rgba(148, 163, 184, 0.18)',
    borderMedium: 'rgba(148, 163, 184, 0.25)',
    text: '#E5E7EB',
    textMuted: '#9CA3AF',
    textInverse: '#16181D',
    accentRed: '#E3173E',
    accentTeal: '#22A39F',
    accentGold: '#D1A85A',
    accentPurple: '#818CF8',
    accentPink: '#F472B6',
    success: '#22C55E',
    warning: '#FACC15',
    error: '#EF4444',
    cardBg: '#111827',
    inputBg: '#1F2937',
    tabBarBg: 'rgba(5, 8, 22, 0.95)',
    skeleton: 'rgba(148, 163, 184, 0.12)',
  },
  gradients: {
    heroSunset: ['#FDE1C3', '#F9C9B0', '#D9C0F0'] as const,
    tabHalo: ['#FFFFFF', '#F5EBE1'] as const,
    warmGlow: ['#FDE1C3', '#F8F1E7'] as const,
    darkHero: ['#0B1020', '#1A1040', '#050816'] as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radii = {
  xs: 8,
  sm: 14,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const shadows = {
  soft: {
    shadowColor: 'rgba(15, 23, 42, 0.18)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  medium: {
    shadowColor: 'rgba(15, 23, 42, 0.12)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  light: {
    shadowColor: 'rgba(15, 23, 42, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  glow: {
    shadowColor: '#E3173E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

export const typography = {
  // Display serif (editorial headings)
  displayLarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700' as const,
    letterSpacing: -0.8,
  },
  displayMedium: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  // UI sans headings
  headingLarge: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  headingMedium: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  headingSmall: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
  },
  // Body text
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  // Meta / Labels
  labelLarge: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  labelMedium: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.4,
  },
  // Mono utility
  mono: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    fontFamily: 'IBMPlexMono',
  },
} as const;

export const glass = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  lightStrong: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  dark: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
  },
  darkStrong: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
  },
} as const;

export const animation = {
  fast: 200,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  springBouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
} as const;

export const layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  contentMaxWidth: 600,
  tabBarHeight: 84,
  headerHeight: 56,
  cardGap: 12,
  screenPadding: 16,
} as const;

// Track colors for consistent track theming
export const trackColors: Record<string, string> = {
  career: '#1C8F80',
  founder: '#E3173E',
  research: '#6366F1',
  builder: '#D1A85A',
  creator: '#EC4899',
  design: '#8B5CF6',
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof colors.light;

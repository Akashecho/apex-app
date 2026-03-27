import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHero, Button, Typography } from '../../src/components/ui';
import { colors, spacing } from '../../src/config/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <GradientHero 
        title="APEX"
        subtitle="The invite-only merit network for top students"
        style={styles.hero}
      />

      <View style={styles.content}>
        <View style={styles.info}>
          <Typography variant="headingMedium" align="center" style={styles.tagline}>
            Entry is earned.
          </Typography>
          <Typography variant="bodyLarge" align="center" color={colors.light.textMuted} style={styles.description}>
            Proof of work, trajectory, and a contribution mindset are required for admission.
          </Typography>
        </View>

        <View style={styles.actions}>
          <Button 
            title="Apply for Admission" 
            size="lg"
            onPress={() => router.push('/(auth)/apply')}
            style={styles.button}
          />
          
          <Button 
            title="Sign In" 
            variant="outline"
            size="lg"
            onPress={() => router.push('/(auth)/login')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bg,
  },
  hero: {
    flex: 0.45,
  },
  content: {
    flex: 0.55,
    padding: spacing['2xl'],
    justifyContent: 'space-between',
  },
  info: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  tagline: {
    marginBottom: spacing.md,
  },
  description: {
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  actions: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  button: {
    shadowColor: 'transparent',
  },
});

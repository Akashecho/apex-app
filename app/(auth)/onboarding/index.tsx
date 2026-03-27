import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '../../../src/components/ui';
import { colors, spacing, radii } from '../../../src/config/theme';
import { ONBOARDING_STEPS } from '../../../src/config/constants';
import { CheckCircle2, Circle } from 'lucide-react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="displayMedium" style={styles.title}>Welcome to APEX</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            Your provisional 21-day onboarding begins now. Complete these steps to secure full membership.
          </Typography>
        </View>

        <GlassCard intensity={40} style={styles.card}>
          <View style={styles.steps}>
            {ONBOARDING_STEPS.map((step, index) => (
              <View key={step.key} style={styles.stepItem}>
                {index === 0 ? (
                  <Circle color={colors.light.accentRed} size={24} />
                ) : (
                  <Circle color={colors.light.borderMedium} size={24} />
                )}
                
                <View style={styles.stepInfo}>
                  <Typography 
                    variant="labelLarge" 
                    color={index === 0 ? colors.light.text : colors.light.textMuted}
                  >
                    {step.label}
                  </Typography>
                  <Typography variant="labelSmall" color={colors.light.accentRed}>
                    Due: {step.deadline}
                  </Typography>
                </View>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={styles.actions}>
          <Button 
            title="Start: Setup Passport" 
            onPress={() => router.push('/(auth)/onboarding/passport-setup')} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bg,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  card: {
    marginBottom: spacing['2xl'],
  },
  steps: {
    gap: spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  actions: {
    marginTop: 'auto',
  },
});

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button } from '../../src/components/ui';
import { MeritPassport } from '../../src/components/passport/MeritPassport';
import { colors, spacing } from '../../src/config/theme';

export default function PassportScreen() {
  // Mock data for display
  const mockUser = {
    displayName: 'Akash Developer',
    track: 'builder',
    apexScore: 42,
    momentumScore: 12,
    college: 'Engineering Institute of Tech',
    city: 'Bangalore, India',
    photoURL: null,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="displayMedium" style={styles.title}>Passport</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            Your verified achievements and score
          </Typography>
        </View>

        <MeritPassport user={mockUser} style={styles.passport} />

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Recent Achievements</Typography>
          <View style={styles.emptyState}>
            <Typography variant="bodyMedium" color={colors.light.textMuted} align="center">
              Complete a challenge or post a verified win to earn your first achievement.
            </Typography>
            <Button title="View Challenges" variant="outline" style={{ marginTop: 16 }} />
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Invite Rights</Typography>
          <View style={styles.emptyState}>
            <Typography variant="bodyMedium" color={colors.light.textMuted} align="center">
              Reach APEX Score 100 to unlock your first invite code.
            </Typography>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E6D8', // Softer background for passport tab to make paper stand out
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  passport: {
    marginBottom: spacing['2xl'],
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.light.bg,
    padding: spacing.xl,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
});

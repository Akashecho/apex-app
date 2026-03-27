import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, GlassCard } from '../../src/components/ui';
import { TodayMissionCard } from '../../src/components/home/TodayMissionCard';
import { PodPulseCard } from '../../src/components/home/PodPulseCard';
import { OpportunityCard } from '../../src/components/home/OpportunityCard';
import { colors, spacing } from '../../src/config/theme';
import { useAuthContext } from '../../src/providers/AuthProvider';

export default function IntelScreen() {
  const { userData } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Typography variant="headingLarge" style={styles.greeting}>
            Good morning, {userData?.displayName?.split(' ')[0] || 'Builder'}.
          </Typography>
          <View style={styles.badgeContainer}>
            <View style={styles.scoreBadge}>
              <Typography variant="labelSmall" color={colors.light.textMuted}>APEX SCORE</Typography>
              <Typography variant="headingSmall" style={{marginLeft: 6}}>{userData?.apexScore || 0}</Typography>
            </View>
          </View>
        </View>

        <TodayMissionCard 
          mission="Complete your weekly pod check-in"
          isCompleted={missionComplete}
          onComplete={() => setMissionComplete(true)}
        />

        <PodPulseCard />

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>
            Action Required
          </Typography>
          <OpportunityCard 
            title="Software Engineering Intern (Summer 2026)"
            company="Stripe • Bangalore"
            deadlineText="Expires in 12 hours"
            tags={['Remote', 'High Match']}
            type="internship"
          />
        </View>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>
            Match Suggestion
          </Typography>
          <GlassCard style={{ padding: spacing.lg }}>
            <Typography variant="bodyMedium" color={colors.light.textMuted} align="center">
              Complete your profile to unlock member introductions.
            </Typography>
          </GlassCard>
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
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing['2xl'],
  },
  greeting: {
    flex: 1,
    marginRight: spacing.md,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.light.text,
  },
});

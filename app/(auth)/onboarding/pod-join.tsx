import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '../../../src/components/ui';
import { colors, spacing, radii } from '../../../src/config/theme';

export default function PodJoinScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Finish onboarding, go to app
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="headingLarge" style={styles.title}>Your Pod</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            You've been assigned to a pod with 5 other builders. You'll check in with them weekly.
          </Typography>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.podHeader}>
            <View style={styles.podAvatar} />
            <View>
              <Typography variant="headingSmall">Pod Alpha-7</Typography>
              <Typography variant="bodySmall" color={colors.light.accentTeal}>
                Career Track • 6 Members
              </Typography>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <Typography variant="bodyMedium" style={{ marginBottom: 16 }}>
            Your captain is Sarah M. The next weekly check-in is due Sunday at 8 PM.
          </Typography>
          
          <Button 
            title="Join Pod & Complete Onboarding" 
            onPress={handleJoin} 
            loading={loading}
          />
        </GlassCard>
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
    padding: 0,
  },
  podHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  podAvatar: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    backgroundColor: colors.light.accentTeal,
    marginRight: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light.borderSubtle,
    marginBottom: spacing.lg,
  },
});

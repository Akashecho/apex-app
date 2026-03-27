import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing } from '../../src/config/theme';

export default function ApplyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    // Navigate to next application step (proof upload)
    // For now we'll just mock it
    router.replace('/(auth)/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Typography variant="displayMedium" style={styles.title}>Apply</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>
              APEX is an invite-only merit network. Complete this application to join the waitlist and schedule an interview.
            </Typography>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Your Name"
            />
            
            <Input
              label="Email Address"
              placeholder="member@university.edu"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="College / University"
              placeholder="University Name"
            />
            
            <Input
              label="Invite Code (Optional)"
              placeholder="e.g. APEX-WINTER"
            />
            
            <View style={styles.actions}>
              <Button 
                title="Continue to Proof of Work" 
                onPress={handleApply} 
                loading={loading}
              />
              
              <Button 
                title="Cancel" 
                variant="ghost"
                onPress={() => router.back()} 
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.xs,
  },
  form: {
    gap: spacing.md,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});

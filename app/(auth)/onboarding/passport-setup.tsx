import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import { Typography, Input, Button } from '../../../src/components/ui';
import { colors, spacing, radii } from '../../../src/config/theme';

export default function PassportSetupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Real app: update user profile
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/onboarding/pod-join');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Typography variant="headingLarge" style={styles.title}>Setup Passport</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>
              This is your public identity in APEX.
            </Typography>
          </View>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoPlaceholder}>
              <Camera color={colors.light.textMuted} size={32} />
              <Typography variant="labelSmall" color={colors.light.textMuted} style={{marginTop: 8}}>
                Upload Photo
              </Typography>
            </TouchableOpacity>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Bio (max 150 chars)"
              placeholder="Short description of who you are and what you do"
              multiline
              numberOfLines={3}
              style={styles.textArea}
              maxLength={150}
            />
            
            <Input
              label="Current City"
              placeholder="e.g. Bangalore, India"
            />
            
            <Input
              label="Graduation Year"
              placeholder="e.g. 2026"
              keyboardType="number-pad"
            />
            
            <View style={styles.actions}>
              <Button 
                title="Save & Continue" 
                onPress={handleSave} 
                loading={loading}
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
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.light.bgSoft,
    borderWidth: 2,
    borderColor: colors.light.borderSubtle,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: spacing.md,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  actions: {
    marginTop: spacing.xl,
  },
});

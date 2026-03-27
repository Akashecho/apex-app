import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing } from '../../src/config/theme';

export default function ApplyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    inviteCode: ''
  });

  const handleApply = () => {
    if (!formData.fullName || !formData.email || !formData.college) {
      Alert.alert("Missing Fields", "Please fill in your name, email, and college.");
      return;
    }
    
    // Pass data to next screen
    router.push({
      pathname: '/(auth)/apply-track',
      params: { ...formData }
    });
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
              value={formData.fullName}
              onChangeText={(text) => setFormData({...formData, fullName: text})}
            />
            
            <Input
              label="Email Address"
              placeholder="member@university.edu"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
            />
            
            <Input
              label="College / University"
              placeholder="University Name"
              value={formData.college}
              onChangeText={(text) => setFormData({...formData, college: text})}
            />
            
            <Input
              label="Invite Code (Optional)"
              placeholder="e.g. APEX-WINTER"
              value={formData.inviteCode}
              onChangeText={(text) => setFormData({...formData, inviteCode: text})}
            />
            
            <View style={styles.actions}>
              <Button 
                title="Continue to Track Selection" 
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

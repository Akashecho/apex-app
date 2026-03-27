import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/config/firebase';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing } from '../../src/config/theme';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (e: any) {
      setError(e.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Typography variant="displayMedium" style={styles.title}>Create Account</Typography>
            <Typography variant="bodyLarge" color={colors.light.textMuted}>
              You have been provisionally admitted! Set up your account.
            </Typography>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="member@university.edu"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => { setEmail(text); setError(''); }}
              error={error}
            />
            
            <Input
              label="Password"
              placeholder="Create a strong password"
              secureTextEntry
              value={password}
              onChangeText={(text) => { setPassword(text); setError(''); }}
            />
            
            <Button 
              title="Complete Account Setup" 
              onPress={handleSignup} 
              loading={loading}
              style={styles.signupBtn}
            />
            
            <Button 
              variant="ghost"
              title="Back" 
              onPress={() => router.back()}
            />
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
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.xs,
  },
  form: {
    gap: spacing.md,
  },
  signupBtn: {
    marginTop: spacing.lg,
  },
});

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/config/firebase';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing } from '../../src/config/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Let the index.tsx redirect handle routing based on user state
      router.replace('/');
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Typography variant="displayMedium" style={styles.title}>Sign In</Typography>
          <Typography variant="bodyLarge" color={colors.light.textMuted}>
            Welcome back to APEX
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
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={(text) => { setPassword(text); setError(''); }}
          />
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Typography variant="labelMedium" color={colors.light.textMuted}>
              Forgot Password?
            </Typography>
          </TouchableOpacity>
          
          <Button 
            title="Sign In" 
            onPress={handleLogin} 
            loading={loading}
            style={styles.loginBtn}
          />
          
          <Button 
            variant="ghost"
            title="Dev Bypass (Temporary)" 
            onPress={() => router.replace('/(tabs)')}
          />
        </View>
        
        <View style={styles.footer}>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            Don't have an account?{' '}
          </Typography>
          <TouchableOpacity onPress={() => router.push('/(auth)/apply')}>
            <Typography variant="labelLarge" color={colors.light.accentRed}>
              Apply for Admission
            </Typography>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bg,
  },
  keyboardView: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  loginBtn: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button } from '@/components/ui';
import { PodService } from '@/services/pod.service';
import { useAuthContext } from '@/providers/AuthProvider';
import { colors, spacing, radii } from '@/config/theme';
import { ArrowLeft } from 'lucide-react-native';

export default function CheckInScreen() {
  const { podId } = useLocalSearchParams<{ podId: string }>();
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(false);
  const [wins, setWins] = useState('');
  const [blockers, setBlockers] = useState('');
  const [asks, setAsks] = useState('');
  const [goals, setGoals] = useState('');
  
  const handleSubmit = async () => {
    if (!wins.trim() || !goals.trim()) {
      Alert.alert('Missing Fields', 'Wins and goals are required for the check-in.');
      return;
    }

    setLoading(true);
    
    try {
      // Real app: await PodService.submitCheckIn({...})
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Weekly check-in submitted! Keep your streak alive.");
        router.back();
      }, 1000);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit check-in');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Button 
          variant="ghost" 
          icon={<ArrowLeft size={24} color={colors.light.text} />} 
          onPress={() => router.back()} 
          title="" 
          style={styles.backBtn}
        />
        <Typography variant="headingSmall">Weekly Check-in</Typography>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.intro}>
            Share your progress with your pod. Transparency builds accountability.
          </Typography>
          
          <View style={styles.form}>
            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>1. Wins 🏆</Typography>
              <Input
                placeholder="What did you accomplish this week?"
                multiline
                numberOfLines={3}
                style={styles.textArea}
                value={wins}
                onChangeText={setWins}
              />
            </View>

            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>2. Blockers 🚧</Typography>
              <Input
                placeholder="What slowed you down or stopped you?"
                multiline
                numberOfLines={3}
                style={styles.textArea}
                value={blockers}
                onChangeText={setBlockers}
              />
            </View>

            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>3. Asks 🤝</Typography>
              <Input
                placeholder="Do you need intros, feedback, or help from the pod?"
                multiline
                numberOfLines={3}
                style={styles.textArea}
                value={asks}
                onChangeText={setAsks}
              />
            </View>

            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>4. Next Week's Goals 🎯</Typography>
              <Input
                placeholder="What are your 1-2 primary focus areas for next week?"
                multiline
                numberOfLines={3}
                style={styles.textArea}
                value={goals}
                onChangeText={setGoals}
              />
            </View>

            <View style={styles.actions}>
              <Button 
                title="Submit to Pod" 
                onPress={handleSubmit} 
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  backBtn: {
    padding: spacing.xs,
    width: 40,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  intro: {
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
  },
  label: {
    marginBottom: spacing.xs,
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

import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button } from '@/components/ui';
import { colors, spacing } from '@/config/theme';
import { ArrowLeft, Send } from 'lucide-react-native';

export default function IntroRequestScreen() {
  const { targetUserId, targetName } = useLocalSearchParams<{ targetUserId: string, targetName: string }>();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert('Missing Message', 'Please introduce yourself and explain why you want to connect.');
      return;
    }
    
    setLoading(true);
    // In real app: await IntroService.sendRequest(...)
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Intro Request Sent!',
        `${decodeURIComponent(targetName || 'The member')} will see your request in their inbox. You'll be notified if they accept.`,
        [{ text: 'Great!', onPress: () => router.back() }]
      );
    }, 1000);
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
        <Typography variant="headingSmall">Warm Intro Request</Typography>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.intro}>
            Introduce yourself to {decodeURIComponent(targetName || 'this member')}. Explain:
          </Typography>
          
          <View style={styles.bullets}>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>• Who you are</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>• Why you want to connect</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>• What you can offer them</Typography>
          </View>

          <Input
            placeholder="Hi! I'm a builder focused on..."
            multiline
            numberOfLines={6}
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            maxLength={500}
          />

          <Typography variant="labelSmall" color={colors.light.textMuted} align="right">
            {message.length}/500
          </Typography>

          <View style={styles.actions}>
            <Button 
              title="Send Intro Request" 
              icon={<Send size={18} color="#FFF" />}
              onPress={handleSubmit} 
              loading={loading}
              disabled={!message.trim()}
            />
            
            <Button 
              title="Cancel" 
              variant="ghost"
              onPress={() => router.back()} 
            />
          </View>
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
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  intro: {
    marginBottom: spacing.sm,
  },
  bullets: {
    marginBottom: spacing.xl,
    paddingLeft: spacing.sm,
    gap: spacing.xs,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react-native';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing, radii } from '../../src/config/theme';
import * as DocumentPicker from 'expo-document-picker';

export default function ApplyProofScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [proofText, setProofText] = useState('');
  const [commitment, setCommitment] = useState('');
  const [file, setFile] = useState<any>(null);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.error('Error picking document', err);
    }
  };

  const handleSubmit = async () => {
    if (!proofText || !commitment) {
      Alert.alert("Missing Fields", "Please describe your proof of work and commitment.");
      return;
    }
    
    setLoading(true);
    // In real app, we'd:
    // 1. Upload file via StorageService
    // 2. Call ApplicationService.submitApplication
    // 3. Move to signup/success
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Application Submitted", 
        "Your application has been submitted for review. Set up your account to track status.",
        [{ text: "OK", onPress: () => router.push('/(auth)/signup') }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Typography variant="displayMedium" style={styles.title}>Proof of Work</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>
              We assess trajectory over history. Show us what you've built, published, or achieved.
            </Typography>
          </View>
          
          <View style={styles.form}>
            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>
                1. Describe your best work (max 500 chars)
              </Typography>
              <Input
                placeholder="I built X which achieved Y... or I led Z..."
                multiline
                numberOfLines={4}
                style={styles.textArea}
                value={proofText}
                onChangeText={setProofText}
                maxLength={500}
              />
            </View>

            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>
                2. Upload Proof (Optional)
              </Typography>
              <TouchableOpacity style={styles.uploadArea} onPress={handlePickFile}>
                {file ? (
                  <View style={styles.fileAttached}>
                    <FileText color={colors.light.accentTeal} size={32} />
                    <View style={styles.fileInfo}>
                      <Typography variant="bodyMedium" numberOfLines={1}>{file.name}</Typography>
                      <Typography variant="bodySmall" color={colors.light.success}>
                        <CheckCircle2 color={colors.light.success} size={12} style={{marginRight: 4}}/> Attached
                      </Typography>
                    </View>
                  </View>
                ) : (
                  <>
                    <UploadCloud color={colors.light.textMuted} size={32} />
                    <Typography variant="bodyMedium" color={colors.light.textMuted} style={{ marginTop: spacing.sm }}>
                      Tap to upload PDF, PNG, JPG (Max 10MB)
                    </Typography>
                  </>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Typography variant="labelLarge" style={styles.label}>
                3. Seriousness Commitment
              </Typography>
              <Input
                placeholder="Why APEX? Why are you serious about this?"
                multiline
                numberOfLines={3}
                style={styles.textArea}
                value={commitment}
                onChangeText={setCommitment}
              />
            </View>
            
            <View style={styles.actions}>
              <Button 
                title="Submit Application" 
                onPress={handleSubmit} 
                loading={loading}
              />
              
              <Button 
                title="Back" 
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
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
  },
  label: {
    marginBottom: spacing.xs,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.light.borderSubtle,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.bgSoft,
  },
  fileAttached: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  fileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});

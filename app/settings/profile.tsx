import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button } from '../../src/components/ui';
import { colors, spacing, radii } from '../../src/config/theme';
import { useAuthContext } from '../../src/providers/AuthProvider';
import { Camera } from 'lucide-react-native';

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { userData, user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    displayName: userData?.displayName || '',
    bio: userData?.bio || '',
    college: userData?.college || '',
    city: userData?.city || '',
    track: userData?.track || '',
  });

  const handleSave = () => {
    setLoading(true);
    // In real app, call UserService.updateProfile
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully.");
      router.back();
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
            <Typography variant="headingLarge" style={styles.title}>Edit Profile</Typography>
            <Typography variant="bodyMedium" color={colors.light.textMuted}>
              Update your public identity
            </Typography>
          </View>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoPlaceholder}>
              <Camera color={colors.light.textMuted} size={32} />
              <Typography variant="labelSmall" color={colors.light.textMuted} style={{marginTop: 8}}>
                Change Photo
              </Typography>
            </TouchableOpacity>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Display Name"
              value={formData.displayName}
              onChangeText={(text) => setFormData({...formData, displayName: text})}
            />
            
            <Input
              label="Bio (max 150 chars)"
              multiline
              numberOfLines={3}
              style={styles.textArea}
              maxLength={150}
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
            />
            
            <Input
              label="Current City"
              value={formData.city}
              onChangeText={(text) => setFormData({...formData, city: text})}
            />
            
            <Input
              label="College / University"
              value={formData.college}
              onChangeText={(text) => setFormData({...formData, college: text})}
            />
            
            <Input
              label="Track"
              value={formData.track}
              onChangeText={(text) => setFormData({...formData, track: text})}
              editable={false} // Usually track is locked or requires admin approval
            />
            
            <View style={styles.actions}>
              <Button 
                title="Save Changes" 
                onPress={handleSave} 
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.light.bgSoft,
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
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
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
});

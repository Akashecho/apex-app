import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '../../src/components/ui';
import { colors, spacing, radii } from '../../src/config/theme';
import { TRACKS } from '../../src/config/constants';
import { Briefcase, Rocket, FlaskConical, Hammer, PenTool, Palette } from 'lucide-react-native';

const ICON_MAP: Record<string, any> = {
  briefcase: Briefcase,
  rocket: Rocket,
  'flask-conical': FlaskConical,
  hammer: Hammer,
  'pen-tool': PenTool,
  palette: Palette,
};

export default function ApplyTrackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedTrack) return;
    
    router.push({
      pathname: '/(auth)/apply-proof',
      params: { ...params, track: selectedTrack }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="displayMedium" style={styles.title}>Select Track</Typography>
          <Typography variant="bodyMedium" color={colors.light.textMuted}>
            APEX organizes by track-specific prestige. Which track best represents your ambition?
          </Typography>
        </View>
        
        <View style={styles.tracks}>
          {TRACKS.map((track) => {
            const Icon = ICON_MAP[track.icon];
            const isSelected = selectedTrack === track.value;
            
            return (
              <TouchableOpacity
                key={track.value}
                activeOpacity={0.8}
                onPress={() => setSelectedTrack(track.value)}
                style={[
                  styles.trackCard,
                  isSelected && { borderColor: track.color, backgroundColor: `${track.color}10` }
                ]}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${track.color}20` }]}>
                  {Icon && <Icon color={track.color} size={24} />}
                </View>
                <View style={styles.trackInfo}>
                  <Typography variant="headingSmall" color={isSelected ? track.color : colors.light.text}>
                    {track.label}
                  </Typography>
                  <Typography variant="bodySmall" color={colors.light.textMuted} style={styles.description}>
                    {track.description}
                  </Typography>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.actions}>
          <Button 
            title="Continue to Proof of Work" 
            onPress={handleNext} 
            disabled={!selectedTrack}
          />
          <Button 
            title="Back" 
            variant="ghost"
            onPress={() => router.back()} 
          />
        </View>
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
    paddingBottom: spacing['4xl'],
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.xs,
  },
  tracks: {
    gap: spacing.md,
  },
  trackCard: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.light.cardBg,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    shadowColor: 'rgba(15, 23, 42, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  trackInfo: {
    flex: 1,
  },
  description: {
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing['2xl'],
  },
});

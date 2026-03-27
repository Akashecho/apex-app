import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, GlassCard } from '@/components/ui';
import { colors, spacing, radii } from '@/config/theme';
import { ArrowLeft, Bookmark, ExternalLink, Clock, Briefcase, MapPin } from 'lucide-react-native';

export default function OpportunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  // Mock data
  const opportunity = {
    id: id as string,
    title: 'Software Engineering Intern (Summer 2026)',
    company: 'Stripe',
    description: `Join Stripe's Bangalore office for a 12-week summer internship focused on building payment infrastructure.\n\n**What you'll do:**\n• Work on real production code from day one\n• Collaborate with senior engineers on high-scale systems\n• Present your project at Demo Day\n\n**What we're looking for:**\n• CS fundamentals (algorithms, data structures)\n• Experience with one backend language (Java, Go, Python)\n• Strong communication skills\n\n**Benefits:**\n• ₹1,50,000/month stipend\n• Housing assistance\n• Return offer pipeline to full-time roles`,
    location: 'Bangalore, India',
    tags: ['Internship', 'Backend', 'SWE'],
    deadline: 'April 15, 2026',
    stipend: '₹1,50,000/month',
    applyURL: 'https://stripe.com/careers',
  };

  const handleApply = () => {
    // In real app: await OpportunityService.recordAction(opportunity.id, userId, 'applied')
    Alert.alert(
      'Apply via Stripe Careers',
      'This will open the external application link.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Link', onPress: () => console.log('Opening:', opportunity.applyURL) }
      ]
    );
  };

  const handleSave = () => {
    setSaved(!saved);
    // In real app: await OpportunityService.recordAction(opportunity.id, userId, saved ? 'unsaved' : 'saved')
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingSmall">Opportunity</Typography>
        <TouchableOpacity onPress={handleSave}>
          <Bookmark 
            color={saved ? colors.light.accentGold : colors.light.textMuted} 
            size={24} 
            fill={saved ? colors.light.accentGold : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.heroCard} containerStyle={{ marginBottom: spacing.xl }}>
          <Typography variant="headingLarge" style={styles.title}>{opportunity.title}</Typography>
          
          <View style={styles.meta}>
            <View style={styles.metaRow}>
              <Briefcase color={colors.light.textMuted} size={16} />
              <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.metaText}>
                {opportunity.company}
              </Typography>
            </View>
            <View style={styles.metaRow}>
              <MapPin color={colors.light.textMuted} size={16} />
              <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.metaText}>
                {opportunity.location}
              </Typography>
            </View>
            <View style={styles.metaRow}>
              <Clock color={colors.light.accentRed} size={16} />
              <Typography variant="bodyMedium" color={colors.light.accentRed} style={styles.metaText}>
                Deadline: {opportunity.deadline}
              </Typography>
            </View>
          </View>

          <View style={styles.tagRow}>
            {opportunity.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Typography variant="labelSmall" color={colors.light.textMuted}>{tag}</Typography>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={styles.section}>
          <Typography variant="headingSmall" style={styles.sectionTitle}>Details</Typography>
          <Typography variant="bodyMedium" style={styles.body}>{opportunity.description}</Typography>
        </View>

        <View style={styles.stipendRow}>
          <Typography variant="labelSmall" color={colors.light.textMuted}>STIPEND</Typography>
          <Typography variant="headingMedium" color={colors.light.accentTeal}>{opportunity.stipend}</Typography>
        </View>

        <View style={styles.actions}>
          <Button 
            title="Apply Now" 
            icon={<ExternalLink size={18} color="#FFF" />}
            onPress={handleApply}
            style={styles.applyBtn}
          />
          
          <Button 
            title="Request Referral / Prep Help"
            variant="outline"
            onPress={() => Alert.alert('Referral', 'This feature requests a referral from someone in your network.')}
            style={styles.actionBtn}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
    backgroundColor: colors.light.bg,
  },
  backBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  heroCard: {
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.lg,
  },
  meta: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  body: {
    lineHeight: 24,
  },
  stipendRow: {
    gap: spacing.xs,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
  actions: {
    gap: spacing.md,
  },
  applyBtn: {
    shadowColor: 'transparent',
  },
  actionBtn: {
    shadowColor: 'transparent',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, ActionPill, GlassCard } from '@/components/ui';
import { OpportunityCard } from '@/components/home/OpportunityCard';
import { colors, spacing } from '@/config/theme';
import { Save, ArrowRight } from 'lucide-react-native';

const MOCK_OPPORTUNITIES = [
  {
    id: 'o1',
    title: 'Software Engineering Intern (Summer 2026)',
    company: 'Stripe • Bangalore',
    deadlineText: 'Expires in 12 hours',
    tags: ['Remote', 'High Match'],
    type: 'internship',
  },
  {
    id: 'o2',
    title: 'Founder-in-Residence Program',
    company: 'Y Combinator',
    deadlineText: 'April 15, 2026',
    tags: ['Startup', 'Top Tier'],
    type: 'program',
  },
  {
    id: 'o3',
    title: 'Research Assistant - ML',
    company: 'IIT Bombay CS Dept',
    deadlineText: 'Rolling basis',
    tags: ['Research', 'Part-time'],
    type: 'research',
  },
  {
    id: 'o4',
    title: 'Hack the Future Hackathon',
    company: 'NIT Trichy',
    deadlineText: 'March 30, 2026',
    tags: ['Hackathon', 'Prize: ₹2L'],
    type: 'hackathon',
  },
];

export default function OpportunitiesIndexScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'applied'>('all');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Typography variant="headingLarge" style={styles.title}>Opportunities</Typography>
        <Typography variant="bodyMedium" color={colors.light.textMuted} style={styles.subtitle}>
          Curated for your track and goals.
        </Typography>
        
        <View style={styles.tabSelector}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
            onPress={() => setActiveTab('all')}
          >
            <Typography 
              variant="labelMedium" 
              color={activeTab === 'all' ? colors.light.textInverse : colors.light.textMuted}
            >
              All
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'saved' && styles.tabBtnActive]}
            onPress={() => setActiveTab('saved')}
          >
            <Typography 
              variant="labelMedium" 
              color={activeTab === 'saved' ? colors.light.textInverse : colors.light.textMuted}
            >
              Saved
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'applied' && styles.tabBtnActive]}
            onPress={() => setActiveTab('applied')}
          >
            <Typography 
              variant="labelMedium" 
              color={activeTab === 'applied' ? colors.light.textInverse : colors.light.textMuted}
            >
              Applied
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={MOCK_OPPORTUNITIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => router.push(`/opportunities/${item.id}`)}
          >
            <OpportunityCard 
              title={item.title}
              company={item.company}
              deadlineText={item.deadlineText}
              tags={item.tags}
              type={item.type}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bg,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.light.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.light.bgSoft,
    borderRadius: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: colors.light.text,
  },
  list: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
});

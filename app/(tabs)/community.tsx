import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography, GlassCard } from '../../src/components/ui';
import { colors, spacing, radii } from '../../src/config/theme';
import { Hash, MessageCircle, ArrowRight } from 'lucide-react-native';

const CHANNELS = [
  { id: 'general', name: 'General', type: 'discussion', description: 'General discussion for all members' },
  { id: 'wins', name: 'Wins', type: 'wins', description: 'Share your achievements and celebrate others' },
  { id: 'ask', name: 'Ask APEX', type: 'asks', description: 'Ask questions, get help from the community' },
  { id: 'opportunities', name: 'Opportunities', type: 'opportunities', description: 'Post and discover opportunities' },
];

const CHAT_ROOMS = [
  { id: 'pod-alpha-7', name: 'Pod Alpha-7', type: 'pod', unread: 3 },
  { id: 'founder-track', name: 'Founder Track Lounge', type: 'channel', unread: 0 },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'chat'>('feed');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="headingLarge" style={styles.title}>Community</Typography>
        
        <View style={styles.tabSelector}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'feed' && styles.tabButtonActive]}
            onPress={() => setActiveTab('feed')}
          >
            <Typography 
              variant="labelMedium" 
              color={activeTab === 'feed' ? colors.light.textInverse : colors.light.textMuted}
            >
              Feed
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'chat' && styles.tabButtonActive]}
            onPress={() => setActiveTab('chat')}
          >
            <Typography 
              variant="labelMedium" 
              color={activeTab === 'chat' ? colors.light.textInverse : colors.light.textMuted}
            >
              Live Chat
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'feed' ? (
          <View style={styles.section}>
            {CHANNELS.map(channel => (
              <TouchableOpacity 
                key={channel.id} 
                activeOpacity={0.8}
                onPress={() => router.push(`/community/channel/${channel.id}`)}
              >
                <GlassCard style={styles.channelCard} containerStyle={{ marginBottom: spacing.md }}>
                  <View style={styles.channelIcon}>
                    <Hash color={colors.light.accentTeal} size={20} />
                  </View>
                  <View style={styles.channelInfo}>
                    <Typography variant="headingSmall">{channel.name}</Typography>
                    <Typography variant="bodySmall" color={colors.light.textMuted}>
                      {channel.description}
                    </Typography>
                  </View>
                  <ArrowRight color={colors.light.borderMedium} size={20} />
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            {CHAT_ROOMS.map(room => (
              <TouchableOpacity 
                key={room.id} 
                activeOpacity={0.8}
                onPress={() => router.push(`/community/chat/${room.id}`)}
              >
                <GlassCard style={styles.chatCard} containerStyle={{ marginBottom: spacing.md }}>
                  <View style={[styles.chatIcon, room.type === 'pod' && styles.podIcon]}>
                    <MessageCircle color={room.type === 'pod' ? colors.light.accentRed : colors.light.accentPurple} size={20} />
                  </View>
                  <View style={styles.chatInfo}>
                    <Typography variant="headingSmall">{room.name}</Typography>
                    <Typography variant="bodySmall" color={colors.light.textMuted}>
                      {room.type === 'pod' ? 'Your weekly pod group' : 'Live channel'}
                    </Typography>
                  </View>
                  {room.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Typography variant="labelSmall" color={colors.light.textInverse}>
                        {room.unread}
                      </Typography>
                    </View>
                  )}
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    padding: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.lg,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.light.bgSoft,
    borderRadius: radii.pill,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radii.pill,
  },
  tabButtonActive: {
    backgroundColor: colors.light.text,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing['4xl'],
  },
  section: {
    flex: 1,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: `${colors.light.accentTeal}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  channelInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: `${colors.light.accentPurple}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  podIcon: {
    backgroundColor: `${colors.light.accentRed}20`,
  },
  chatInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  unreadBadge: {
    backgroundColor: colors.light.accentRed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, ActionPill } from '@/components/ui';
import { PostCard } from '@/components/community/PostCard';
import { PostService, Post } from '@/services/post.service';
import { colors, spacing } from '@/config/theme';
import { ArrowLeft, Edit3 } from 'lucide-react-native';

export default function ChannelScreen() {
  const { channelId } = useLocalSearchParams<{ channelId: string }>();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<'hot' | 'new' | 'top'>('hot');

  useEffect(() => {
    loadPosts();
  }, [channelId, sort]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      // Mock data for display while we wire up the real backend
      const mockPosts: Post[] = [
        {
          id: '1',
          channelId: channelId as string,
          authorId: 'u1',
          authorName: 'Sarah M.',
          authorPhotoURL: null,
          authorTrack: 'founder',
          type: 'win',
          title: 'Just launched my MVP and got first 100 users!',
          body: 'After 3 months of building, the MVP is finally live...',
          mediaURLs: [],
          linkURL: null,
          tags: ['launch', 'saas'],
          upvoteCount: 45,
          downvoteCount: 2,
          voteScore: 43,
          commentCount: 12,
          createdAt: new Date(),
        },
        {
          id: '2',
          channelId: channelId as string,
          authorId: 'u2',
          authorName: 'David K.',
          authorPhotoURL: null,
          authorTrack: 'career',
          type: 'ask',
          title: 'How to negotiate return offer from summer internship?',
          body: 'I received a return offer but the comp is lower than expected...',
          mediaURLs: [],
          linkURL: null,
          tags: ['negotiation', 'internship'],
          upvoteCount: 15,
          downvoteCount: 0,
          voteScore: 15,
          commentCount: 8,
          createdAt: new Date(Date.now() - 86400000),
        }
      ];
      
      // In real app: const data = await PostService.getPosts(channelId as string, sort);
      setPosts(mockPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingMedium" style={styles.title}>
          #{channelId}
        </Typography>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <View style={styles.sortBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortContent}>
          <ActionPill 
            label="Hot" 
            active={sort === 'hot'} 
            onPress={() => setSort('hot')} 
            size="sm" 
          />
          <View style={{ width: spacing.sm }} />
          <ActionPill 
            label="New" 
            active={sort === 'new'} 
            onPress={() => setSort('new')} 
            size="sm" 
            color={colors.light.accentTeal}
          />
          <View style={{ width: spacing.sm }} />
          <ActionPill 
            label="Top" 
            active={sort === 'top'} 
            onPress={() => setSort('top')} 
            size="sm" 
            color={colors.light.accentGold}
          />
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.light.accentRed} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <PostCard 
              post={item} 
              onPress={() => router.push(`/community/post/${item.id}`)} 
            />
          )}
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push(`/community/post/create?channelId=${channelId}`)}
      >
        <Edit3 color="#FFF" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.bgSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.light.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  backBtn: {
    padding: spacing.xs,
  },
  title: {
    textTransform: 'capitalize',
  },
  sortBar: {
    backgroundColor: colors.light.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  sortContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  list: {
    padding: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.light.accentRed,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.light.accentRed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});

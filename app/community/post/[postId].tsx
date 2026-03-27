import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react-native';

import { Typography, Input, Button } from '@/components/ui';
import { PostService, Post } from '@/services/post.service';
import { useAuthContext } from '@/providers/AuthProvider';
import { colors, spacing, radii } from '@/config/theme';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    setLoading(true);
    try {
      // const data = await PostService.getPostDetails(postId as string);
      // For now, mock data:
      setPost({
        id: postId as string,
        channelId: 'general',
        authorId: 'u1',
        authorName: 'Sarah M.',
        authorPhotoURL: null,
        authorTrack: 'founder',
        type: 'discussion',
        title: 'Building a community platform with React Native',
        body: 'Here are some lessons learned while building this app:\n\n1. **Expo Router** makes file-based navigation a breeze.\n2. *React Native Reanimated* is so powerful for 60fps animations.\n3. Using a `GlassCard` component adds instant premium feel.\n\nWhat are your thoughts on using NativeWind vs raw StyleSheet?',
        mediaURLs: [],
        linkURL: null,
        tags: ['react-native', 'expo', 'lessons-learned'],
        upvoteCount: 42,
        downvoteCount: 0,
        voteScore: 42,
        commentCount: 5,
        createdAt: new Date(),
      } as any);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (value: 1 | -1) => {
    // Optimistic UI update could go here
    if (!user) return;
    try {
      await PostService.votePost(postId as string, user.uid, value);
      // Refresh post
      loadPost();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !post) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.light.accentRed} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingSmall">Thread</Typography>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Post Content */}
        <View style={styles.postContainer}>
          <View style={styles.authorRow}>
            <View style={styles.avatar} />
            <View>
              <View style={styles.nameRow}>
                <Typography variant="labelLarge">{post.authorName}</Typography>
                <Typography variant="labelSmall" color={colors.light.accentTeal} style={styles.track}>
                  • {post.authorTrack}
                </Typography>
              </View>
              <Typography variant="labelSmall" color={colors.light.textMuted}>
                {post.createdAt instanceof Date 
                  ? formatDistanceToNow(post.createdAt, { addSuffix: true }) 
                  : 'just now'}
              </Typography>
            </View>
          </View>

          <Typography variant="headingLarge" style={styles.title}>
            {post.title}
          </Typography>

          <View style={styles.bodyContainer}>
            <Markdown style={markdownStyles}>
              {post.body}
            </Markdown>
          </View>

          <View style={styles.actionRow}>
            <View style={styles.voteGroup}>
              <TouchableOpacity onPress={() => handleVote(1)} style={styles.voteBtn}>
                <ArrowUp color={colors.light.textMuted} size={20} />
              </TouchableOpacity>
              <Typography variant="labelLarge" style={styles.score}>{post.voteScore}</Typography>
              <TouchableOpacity onPress={() => handleVote(-1)} style={styles.voteBtn}>
                <ArrowDown color={colors.light.textMuted} size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.commentCount}>
              <MessageSquare color={colors.light.textMuted} size={20} />
              <Typography variant="labelLarge" color={colors.light.textMuted} style={styles.score}>
                {post.commentCount}
              </Typography>
            </View>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Typography variant="headingSmall" style={styles.commentsTitle}>Comments</Typography>
          
          <View style={styles.commentInputContainer}>
            <View style={styles.avatarSmall} />
            <Input 
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
              style={styles.commentInput}
            />
          </View>
          <View style={styles.commentActions}>
            <Button 
              title="Post" 
              size="sm" 
              disabled={!commentText.trim()} 
              onPress={() => setCommentText('')} 
              fullWidth={false}
            />
          </View>

          {/* Empty state for mock */}
          <View style={styles.emptyComments}>
            <Typography variant="bodyMedium" color={colors.light.textMuted} align="center">
              No comments yet. Be the first to share your thoughts!
            </Typography>
          </View>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  backBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  postContainer: {
    padding: spacing.xl,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderSubtle,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.light.bgSoft,
    marginRight: spacing.md,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.light.bgSoft,
    marginRight: spacing.md,
    marginTop: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  title: {
    marginBottom: spacing.md,
  },
  bodyContainer: {
    marginBottom: spacing.xl,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.bgSoft,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginRight: spacing.xl,
  },
  voteBtn: {
    padding: spacing.xs,
  },
  score: {
    marginHorizontal: spacing.sm,
  },
  commentCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsSection: {
    padding: spacing.xl,
  },
  commentsTitle: {
    marginBottom: spacing.lg,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentInput: {
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#FFFFFF',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  emptyComments: {
    padding: spacing.xl,
    backgroundColor: colors.light.bgSoft,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
    borderStyle: 'dashed',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: colors.light.text,
    fontSize: 16,
    lineHeight: 24,
  },
  strong: {
    fontWeight: '600',
  },
  code_inline: {
    backgroundColor: colors.light.bgSoft,
    borderRadius: 4,
    padding: 4,
  },
});

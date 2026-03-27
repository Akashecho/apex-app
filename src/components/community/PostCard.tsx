import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, GlassCard } from '../ui';
import { colors, spacing, radii } from '../../config/theme';
import { POST_TYPES } from '../../config/constants';
import { ArrowUp, MessageSquare, ExternalLink } from 'lucide-react-native';
import { Post } from '../../services/post.service';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export function PostCard({ post, onPress }: PostCardProps) {
  const postTypeInfo = POST_TYPES.find(t => t.value === post.type) || POST_TYPES[7];
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <GlassCard style={styles.card} containerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
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
          <View style={[styles.typePill, { backgroundColor: `${postTypeInfo.color}15` }]}>
            <Typography variant="labelSmall" color={postTypeInfo.color}>
              {postTypeInfo.label}
            </Typography>
          </View>
        </View>

        <Typography variant="headingSmall" style={styles.title}>
          {post.title}
        </Typography>
        
        <Typography variant="bodyMedium" color={colors.light.textMuted} numberOfLines={3} style={styles.body}>
          {post.body}
        </Typography>

        {post.tags && post.tags.length > 0 && (
          <View style={styles.tags}>
            {post.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Typography variant="labelSmall" color={colors.light.textMuted}>#{tag}</Typography>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.voteRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <ArrowUp color={colors.light.textMuted} size={18} />
              <Typography variant="labelMedium" color={colors.light.textMuted} style={styles.actionText}>
                {post.voteScore}
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn}>
              <MessageSquare color={colors.light.textMuted} size={18} />
              <Typography variant="labelMedium" color={colors.light.textMuted} style={styles.actionText}>
                {post.commentCount}
              </Typography>
            </TouchableOpacity>
          </View>
          
          {post.linkURL && (
            <TouchableOpacity style={styles.actionBtn}>
              <ExternalLink color={colors.light.textMuted} size={18} />
            </TouchableOpacity>
          )}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.light.bgSoft,
    marginRight: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.xs,
  },
  title: {
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  body: {
    marginBottom: spacing.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.light.borderSubtle,
  },
  voteRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
  },
});

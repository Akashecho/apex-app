import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Input, Button, ActionPill } from '@/components/ui';
import { PostService } from '@/services/post.service';
import { useAuthContext } from '@/providers/AuthProvider';
import { colors, spacing, radii } from '@/config/theme';
import { POST_TYPES } from '@/config/constants';
import { ArrowLeft, Link as LinkIcon, Image as ImageIcon } from 'lucide-react-native';

export default function CreatePostScreen() {
  const { channelId } = useLocalSearchParams<{ channelId: string }>();
  const router = useRouter();
  const { user, userData } = useAuthContext();
  
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('discussion');
  const [tags, setTags] = useState('');

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Missing Fields', 'Please enter a title and body.');
      return;
    }
    
    if (!user || !userData) {
      Alert.alert('Error', 'You must be logged in to post.');
      return;
    }

    setLoading(true);
    
    try {
      const tagArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
      
      const newPostId = await PostService.createPost({
        channelId: channelId as string,
        authorId: user.uid,
        authorName: userData.displayName || 'Member',
        authorPhotoURL: null,
        authorTrack: userData.track || 'general',
        type,
        title: title.trim(),
        body: body.trim(),
        mediaURLs: [],
        linkURL: null,
        tags: tagArray,
      });
      
      router.replace(`/community/post/${newPostId}`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create post');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingSmall">New Post</Typography>
        <Button 
          title="Post" 
          size="sm" 
          onPress={handlePost} 
          loading={loading}
          fullWidth={false}
          disabled={!title.trim() || !body.trim()}
        />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.typeSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {POST_TYPES.map(pt => (
                <ActionPill
                  key={pt.value}
                  label={pt.label}
                  active={type === pt.value}
                  onPress={() => setType(pt.value)}
                  color={pt.color}
                  size="sm"
                  style={{ marginRight: spacing.sm }}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.form}>
            <Input
              placeholder="An interesting title"
              value={title}
              onChangeText={setTitle}
              maxLength={200}
              style={styles.titleInput}
            />
            
            <Input
              placeholder="What are your thoughts? (Supports Markdown)"
              value={body}
              onChangeText={setBody}
              multiline
              numberOfLines={8}
              style={styles.bodyInput}
              maxLength={5000}
            />
            
            <Input
              placeholder="Tags (comma separated, e.g. saas, launching)"
              value={tags}
              onChangeText={setTags}
            />
            
            <View style={styles.attachments}>
              <TouchableOpacity style={styles.attachBtn}>
                <LinkIcon color={colors.light.textMuted} size={20} />
                <Typography variant="labelMedium" color={colors.light.textMuted} style={styles.attachText}>
                  Add Link
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.attachBtn}>
                <ImageIcon color={colors.light.textMuted} size={20} />
                <Typography variant="labelMedium" color={colors.light.textMuted} style={styles.attachText}>
                  Add Media
                </Typography>
              </TouchableOpacity>
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
  typeSelector: {
    marginBottom: spacing.lg,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '600',
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  bodyInput: {
    fontSize: 16,
    minHeight: 200,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    textAlignVertical: 'top',
  },
  attachments: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.light.borderSubtle,
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.bgSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
  },
  attachText: {
    marginLeft: 8,
  },
});

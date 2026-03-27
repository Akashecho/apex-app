import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui';
import { ChatService, ChatMessage } from '@/services/chat.service';
import { useAuthContext } from '@/providers/AuthProvider';
import { colors, spacing, radii } from '@/config/theme';
import { ArrowLeft, Send } from 'lucide-react-native';
import { format } from 'date-fns';

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const { user, userData } = useAuthContext();
  const flatListRef = useRef<FlatList>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!roomId) return;
    
    // Subscribe to messages
    const unsubscribeMessages = ChatService.subscribeToMessages(roomId as string, (fetchedMessages) => {
      setMessages(fetchedMessages);
    });
    
    // Subscribe to typing indicators
    let unsubscribeTyping = () => {};
    if (user) {
      unsubscribeTyping = ChatService.subscribeToTyping(roomId as string, user.uid, (typing) => {
        setTypingUsers(typing);
      });
    }
    
    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [roomId, user]);

  const handleSend = async () => {
    if (!inputText.trim() || !user || !userData) return;
    
    const messageText = inputText.trim();
    setInputText('');
    
    // Clear typing status
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    ChatService.setTypingStatus(roomId as string, user.uid, false);
    
    try {
      await ChatService.sendMessage(roomId as string, {
        senderId: user.uid,
        senderName: userData.displayName || 'Member',
        senderPhotoURL: userData.photoURL || null,
        text: messageText,
        type: 'text'
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (text: string) => {
    setInputText(text);
    
    if (!user) return;
    
    ChatService.setTypingStatus(roomId as string, user.uid, text.length > 0);
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      ChatService.setTypingStatus(roomId as string, user.uid, false);
    }, 2000); // Stop typing after 2 seconds of inactivity
  };

  const renderMessage = ({ item, index }: { item: ChatMessage, index: number }) => {
    const isMe = item.senderId === user?.uid;
    
    // Check if previous message is from same sender (to group them)
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showHeader = !prevMessage || prevMessage.senderId !== item.senderId || (item.timestamp - prevMessage.timestamp > 600000); // 10 mins

    return (
      <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
        {!isMe && showHeader && (
          <Typography variant="labelSmall" color={colors.light.textMuted} style={styles.senderName}>
            {item.senderName}
          </Typography>
        )}
        
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Typography variant="bodyMedium" color={isMe ? colors.light.textInverse : colors.light.text}>
            {item.text}
          </Typography>
        </View>
        
        {showHeader && (
          <Typography variant="labelSmall" color={colors.light.textMuted} style={styles.time}>
            {item.timestamp ? format(new Date(item.timestamp), 'h:mm a') : 'Now'}
          </Typography>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.light.text} size={24} />
        </TouchableOpacity>
        <Typography variant="headingSmall" style={styles.title}>
          Chat: {roomId}
        </Typography>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        {typingUsers.length > 0 && (
          <View style={styles.typingIndicator}>
            <Typography variant="labelSmall" color={colors.light.textMuted}>
              {typingUsers.length === 1 ? 'Someone is typing...' : 'Several people are typing...'}
            </Typography>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            value={inputText}
            onChangeText={handleTyping}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send color={inputText.trim() ? colors.light.accentRed : colors.light.borderMedium} size={20} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.light.bg,
    zIndex: 10,
  },
  backBtn: {
    padding: spacing.xs,
  },
  title: {
    textTransform: 'capitalize',
  },
  list: {
    padding: spacing.md,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageWrapper: {
    marginBottom: 4,
    maxWidth: '80%',
  },
  messageWrapperMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageWrapperOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  senderName: {
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  bubbleMe: {
    backgroundColor: colors.light.accentRed,
    borderBottomRightRadius: radii.xs,
  },
  bubbleOther: {
    backgroundColor: colors.light.bgSoft,
    borderBottomLeftRadius: radii.xs,
    borderWidth: 1,
    borderColor: colors.light.borderSubtle,
  },
  time: {
    marginTop: 2,
    fontSize: 10,
    marginHorizontal: 4,
  },
  typingIndicator: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.light.bg,
    borderTopWidth: 1,
    borderTopColor: colors.light.borderSubtle,
  },
  input: {
    flex: 1,
    backgroundColor: colors.light.bgSoft,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    minHeight: 40,
    maxHeight: 120,
    fontSize: 16,
    color: colors.light.text,
  },
  sendBtn: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});

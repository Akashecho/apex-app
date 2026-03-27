import { ref, push, set, onValue, off, serverTimestamp, query, limitToLast, orderByChild } from 'firebase/database';
import { rtdb } from '../config/firebase';

export interface ChatMessage {
  id?: string;
  senderId: string;
  senderName: string;
  senderPhotoURL: string | null;
  text: string;
  type: 'text' | 'image' | 'link' | 'system';
  mediaURL?: string | null;
  timestamp: number;
}

export const ChatService = {
  /**
   * Send a message to a RTDB chat room
   */
  async sendMessage(roomId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    try {
      const messagesRef = ref(rtdb, `chat_messages/${roomId}`);
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        ...message,
        timestamp: serverTimestamp()
      });
      
      return newMessageRef.key;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * Subscribe to messages in a room
   * Returns an unsubscribe function
   */
  subscribeToMessages(roomId: string, callback: (messages: ChatMessage[]) => void, limit = 50) {
    const messagesRef = query(
      ref(rtdb, `chat_messages/${roomId}`),
      limitToLast(limit)
    );

    const listener = onValue(messagesRef, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key as string,
          ...childSnapshot.val()
        });
      });
      
      // Return sorted by timestamp (Firebase guarantees this roughly, but good to be sure)
      callback(messages);
    });

    return () => off(ref(rtdb, `chat_messages/${roomId}`), 'value', listener);
  },

  /**
   * Update user typing status
   */
  async setTypingStatus(roomId: string, userId: string, isTyping: boolean) {
    try {
      const typingRef = ref(rtdb, `typing/${roomId}/${userId}`);
      if (isTyping) {
        await set(typingRef, {
          isTyping: true,
          timestamp: serverTimestamp()
        });
      } else {
        await set(typingRef, null); // Remove node when not typing
      }
    } catch (error) {
      console.error('Error setting typing status:', error);
    }
  },

  /**
   * Subscribe to typing status for a room
   */
  subscribeToTyping(roomId: string, currentUserId: string, callback: (typingUsers: string[]) => void) {
    const typingRef = ref(rtdb, `typing/${roomId}`);
    
    const listener = onValue(typingRef, (snapshot) => {
      const typingUsers: string[] = [];
      snapshot.forEach((childSnapshot) => {
        const userId = childSnapshot.key as string;
        // Don't include current user in typing list
        if (userId !== currentUserId && childSnapshot.val()?.isTyping) {
          typingUsers.push(userId);
        }
      });
      callback(typingUsers);
    });

    return () => off(typingRef, 'value', listener);
  }
};

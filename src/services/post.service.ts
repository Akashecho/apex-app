import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp, runTransaction, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Post {
  id?: string;
  channelId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string | null;
  authorTrack: string;
  type: string;
  title: string;
  body: string;
  mediaURLs: string[];
  linkURL: string | null;
  tags: string[];
  upvoteCount: number;
  downvoteCount: number;
  voteScore: number;
  commentCount: number;
  createdAt: any;
}

export const PostService = {
  /**
   * Get posts for a specific channel, ordered by Hot score or New
   */
  async getPosts(channelId: string, sortBy: 'hot' | 'new' | 'top' = 'hot', maxResults = 20) {
    try {
      let q = query(
        collection(db, 'posts'),
        where('channelId', '==', channelId)
      );

      if (sortBy === 'new') {
        q = query(q, orderBy('createdAt', 'desc'), limit(maxResults));
      } else if (sortBy === 'top') {
        q = query(q, orderBy('voteScore', 'desc'), limit(maxResults));
      } else {
        // Hot sorting requires a custom index: channelId ASC, sortHot DESC
        q = query(q, orderBy('sortHot', 'desc'), limit(maxResults));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  /**
   * Create a new post
   */
  async createPost(postData: Omit<Post, 'id' | 'upvoteCount' | 'downvoteCount' | 'voteScore' | 'commentCount' | 'createdAt'>) {
    try {
      const now = serverTimestamp();
      
      const docRef = await addDoc(collection(db, 'posts'), {
        ...postData,
        upvoteCount: 1, // Author auto-upvotes
        downvoteCount: 0,
        voteScore: 1,
        commentCount: 0,
        sortHot: Date.now(), // Initial hot score approximation
        createdAt: now,
        updatedAt: now,
      });

      // Auto-vote by author
      const voteRef = doc(db, `posts/${docRef.id}/votes`, postData.authorId);
      await addDoc(collection(db, `posts/${docRef.id}/votes`), {
        oderId: postData.authorId,
        postId: docRef.id,
        vote: 1,
        createdAt: now
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  /**
   * Upvote or downvote a post using a transaction to prevent race conditions
   */
  async votePost(postId: string, userId: string, voteValue: 1 | -1 | 0) {
    try {
      const postRef = doc(db, 'posts', postId);
      // We use the userId as the document ID for the vote to ensure 1 vote per user
      const voteRef = doc(db, `posts/${postId}/votes`, userId);

      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        const voteDoc = await transaction.get(voteRef);

        if (!postDoc.exists()) {
          throw new Error('Post does not exist!');
        }

        let currentVote = 0;
        if (voteDoc.exists()) {
          currentVote = voteDoc.data().vote;
        }

        // If user is clicking the same vote again, remove it (unlike)
        const newVote = currentVote === voteValue ? 0 : voteValue;
        
        // Calculate deltas
        const upvoteDelta = (newVote === 1 ? 1 : 0) - (currentVote === 1 ? 1 : 0);
        const downvoteDelta = (newVote === -1 ? 1 : 0) - (currentVote === -1 ? 1 : 0);
        const scoreDelta = upvoteDelta - downvoteDelta;

        // Apply changes
        if (newVote === 0) {
          transaction.delete(voteRef);
        } else {
          transaction.set(voteRef, {
            oderId: userId,
            postId: postId,
            vote: newVote,
            updatedAt: serverTimestamp()
          }, { merge: true });
        }

        // A basic Reddit hot ranking algorithm implementation would go here
        // For now, we just update the counts
        transaction.update(postRef, {
          upvoteCount: increment(upvoteDelta),
          downvoteCount: increment(downvoteDelta),
          voteScore: increment(scoreDelta)
        });
      });
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  },

  /**
   * Get post details including comments
   */
  async getPostDetails(postId: string) {
    try {
      const postSnap = await getDoc(doc(db, 'posts', postId));
      if (!postSnap.exists()) return null;

      // Fetch top-level comments
      const commentsQuery = query(
        collection(db, `posts/${postId}/comments`),
        where('depth', '==', 0),
        orderBy('voteScore', 'desc'),
        limit(50)
      );
      
      const commentsSnap = await getDocs(commentsQuery);
      const comments = commentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      return {
        id: postSnap.id,
        ...postSnap.data(),
        comments
      };
    } catch (error) {
      console.error('Error getting post details:', error);
      throw error;
    }
  }
};

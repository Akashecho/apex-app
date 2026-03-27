import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Pod {
  id?: string;
  name: string;
  track: string;
  captainId: string;
  memberIds: string[];
  memberCount: number;
  status: 'forming' | 'active' | 'archived';
  weeklyPrompt?: string;
  healthScore: number;
  streakWeeks: number;
}

export interface PodCheckIn {
  id?: string;
  podId: string;
  userId: string;
  week: string; // e.g. "2026-W13"
  wins: string[];
  blockers: string[];
  asks: string[];
  goals: string[];
  mood: 'great' | 'good' | 'okay' | 'struggling';
  createdAt: any;
}

export const PodService = {
  /**
   * Get user's current pod
   */
  async getUserPod(userId: string) {
    try {
      const q = query(
        collection(db, 'pods'),
        where('memberIds', 'array-contains', userId),
        where('status', '==', 'active')
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      
      // User should only be in one active pod at a time
      const podDoc = snapshot.docs[0];
      return { id: podDoc.id, ...podDoc.data() } as Pod;
    } catch (error) {
      console.error('Error fetching user pod:', error);
      throw error;
    }
  },

  /**
   * Submit a weekly check-in
   */
  async submitCheckIn(checkInData: Omit<PodCheckIn, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'pod_checkins'), {
        ...checkInData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting check-in:', error);
      throw error;
    }
  },

  /**
   * Get recent check-ins for a pod
   */
  async getPodCheckIns(podId: string, week?: string) {
    try {
      let q = query(
        collection(db, 'pod_checkins'),
        where('podId', '==', podId)
      );
      
      if (week) {
        q = query(q, where('week', '==', week));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PodCheckIn));
    } catch (error) {
      console.error('Error fetching check-ins:', error);
      throw error;
    }
  }
};

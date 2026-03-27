import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserProfile {
  displayName?: string;
  bio?: string;
  college?: string;
  city?: string;
  graduationYear?: number;
  skills?: string[];
  goals?: string[];
  track?: string;
}

export const UserService = {
  /**
   * Update the user document and public profile document
   */
  async updateProfile(userId: string, data: UserProfile) {
    try {
      // 1. Update private user doc
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date()
      });
      
      // 2. Update public profile doc
      const profileRef = doc(db, 'profiles', userId);
      const profileSnap = await getDoc(profileRef);
      
      // Only duplicate specific fields to the public profile
      const publicData = {
        displayName: data.displayName,
        bio: data.bio,
        college: data.college,
        city: data.city,
        track: data.track,
      };
      
      // Clean up undefined values
      Object.keys(publicData).forEach(key => 
        publicData[key as keyof typeof publicData] === undefined && delete publicData[key as keyof typeof publicData]
      );
      
      if (Object.keys(publicData).length > 0) {
        if (profileSnap.exists()) {
          await updateDoc(profileRef, publicData);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
  
  /**
   * Get public profile data
   */
  async getPublicProfile(userId: string) {
    try {
      const profileRef = doc(db, 'profiles', userId);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        return { id: profileSnap.id, ...profileSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting public profile:', error);
      throw error;
    }
  }
};

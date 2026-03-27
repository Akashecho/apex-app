import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { StorageService } from './storage.service';

export interface ApplicationDraft {
  userId: string;
  track?: string;
  whyApex?: string;
  proofOfWork?: string;
  proofFiles?: Array<{ url: string, type: string, name: string }>;
  referrerCode?: string;
  availabilityForInterview?: string;
  commitment?: string;
}

export const ApplicationService = {
  /**
   * Save an application as a draft, allowing user to come back
   */
  async saveDraft(applicationId: string, data: Partial<ApplicationDraft>) {
    try {
      const appRef = doc(db, 'applications', applicationId);
      const appSnap = await getDoc(appRef);
      
      if (appSnap.exists()) {
        await updateDoc(appRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'applications'), {
          ...data,
          status: 'draft',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error saving draft application:', error);
      throw error;
    }
  },

  /**
   * Submit an application for review
   */
  async submitApplication(userId: string, data: Omit<ApplicationDraft, 'userId'>) {
    try {
      // Create new application
      const docRef = await addDoc(collection(db, 'applications'), {
        ...data,
        userId,
        status: 'submitted',
        submittedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Update user's membershipStatus
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        membershipStatus: 'applied'
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  /**
   * Get application status for a user
   */
  async getApplicationStatus(userId: string) {
    try {
      const q = query(collection(db, 'applications'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Return most recent application
        const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return apps.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis())[0];
      }
      return null;
    } catch (error) {
      console.error('Error getting application status:', error);
      throw error;
    }
  }
};

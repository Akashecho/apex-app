import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  metadata?: Record<string, any>;
}

/**
 * Tracks a custom analytics event to Firestore.
 * Events are batched or throttled in a real app, 
 * but for now we write directly.
 */
export const trackEvent = async (event: string, data: Record<string, any> = {}) => {
  try {
    // Add timestamp
    const payload = {
      event,
      ...data,
      createdAt: serverTimestamp(),
      platform: 'mobile',
    };

    await addDoc(collection(db, 'analytics_events'), payload);
    console.log(`Analytics: ${event}`);
  } catch (error) {
    console.error('Analytics error:', error);
    // Do not throw — analytics should not block user flows
  }
};

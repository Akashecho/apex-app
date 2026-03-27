import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface ScoreEvent {
  userId: string;
  delta: number;
  bucket: string;
  action: string;
  reason: string;
  metadata?: Record<string, any>;
}

/**
 * Triggers when a new score_event document is created.
 * Updates the user's apexScore and momentumScore.
 */
export const onScoreEvent = onDocumentCreated('score_events/{eventId}', async (event) => {
  const snap = event.data;
  if (!snap) {
    console.log('No data associated with the event');
    return;
  }

  const data = snap.data() as ScoreEvent;
  const { userId, delta } = data;

  if (!userId || typeof delta !== 'number') {
    console.error('Invalid score event data:', data);
    return;
  }

  const userRef = db.collection('users').doc(userId);

  try {
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists) {
        console.error(`User ${userId} does not exist`);
        return;
      }

      const userData = userDoc.data();
      
      // Update total score
      const currentScore = userData?.apexScore || 0;
      const newScore = Math.max(0, currentScore + delta); // Don't go below 0
      
      // Update momentum (simplified: reset monthly, accumulate daily)
      const currentMomentum = userData?.momentumScore || 0;
      const newMomentum = Math.max(0, currentMomentum + delta);

      // Check for unlock thresholds (e.g., invite rights at score 100)
      const updates: Record<string, any> = {
        apexScore: newScore,
        momentumScore: newMomentum,
        lastScoreUpdate: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (newScore >= 100 && (currentScore < 100 || !userData?.inviteRightsUnlocked)) {
        updates.inviteRightsUnlocked = true;
        // In a real app, we might also create a notification here
      }

      transaction.update(userRef, updates);
      
      // Update public profile score
      const profileRef = db.collection('profiles').doc(userId);
      transaction.update(profileRef, {
        apexScore: newScore,
        momentumScore: newMomentum
      });
    });

    console.log(`Updated score for user ${userId}: delta ${delta}`);
  } catch (error) {
    console.error('Error updating user score:', error);
    // In production, you might want to retry this
  }
});

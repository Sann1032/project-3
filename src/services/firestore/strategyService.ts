import { collection, onSnapshot, doc, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserStrategy } from '../../types/strategy';
import { COLLECTIONS } from './collections';
import { convertTimestampToDate } from '../../utils/firestoreConverters';
import { baseStrategyService } from './baseStrategyService';
import { userStrategyService } from './userStrategyService';
import { transformStrategyForFirestore, initializeStrategy } from '../../utils/strategyTransformer';

export const strategyService = {
  ...baseStrategyService,
  ...userStrategyService,

  subscribeToStrategies(userId: string, callback: (strategies: UserStrategy[]) => void): () => void {
    if (!userId) {
      console.error('No user ID provided for strategy subscription');
      callback([]);
      return () => {};
    }

    // Subscribe to both main strategies and user settings
    const strategiesRef = collection(db, COLLECTIONS.STRATEGIES);
    const userSettingsRef = doc(db, `${COLLECTIONS.USERS}/${userId}/settings/strategies`);
    
    let userSettings = {};
    let baseStrategies: UserStrategy[] = [];
    let unsubscribeStrategies: (() => void) | undefined;
    let unsubscribeSettings: (() => void) | undefined;

    try {
      unsubscribeStrategies = onSnapshot(strategiesRef, async (snapshot) => {
        try {
          baseStrategies = snapshot.docs.map(doc => {
            const data = doc.data();
            return initializeStrategy({
              id: doc.id,
              ...data,
              isActive: false,
              dateCreated: convertTimestampToDate(data.dateCreated),
              lastModified: convertTimestampToDate(data.lastModified)
            });
          });

          // Merge with current user settings
          const mergedStrategies = baseStrategies.map(strategy => ({
            ...strategy,
            ...(userSettings[strategy.id] || {}),
            id: strategy.id
          }));

          callback(mergedStrategies);
        } catch (error) {
          console.error('Error merging strategies:', error);
          callback(baseStrategies); // Fallback to base strategies if merge fails
        }
      }, (error) => {
        console.error('Error in strategy subscription:', error);
        callback([]); // Return empty array on error
      });

      unsubscribeSettings = onSnapshot(userSettingsRef, (doc) => {
        if (doc.exists()) {
          userSettings = doc.data() || {};
          // Update strategies with new settings
          const mergedStrategies = baseStrategies.map(strategy => ({
            ...strategy,
            ...(userSettings[strategy.id] || {}),
            id: strategy.id
          }));
          callback(mergedStrategies);
        }
      }, (error) => {
        console.error('Error in settings subscription:', error);
        callback(baseStrategies); // Fallback to base strategies if settings fail
      });
    } catch (error) {
      console.error('Error setting up subscriptions:', error);
      callback([]);
    }

    // Return cleanup function
    return () => {
      if (unsubscribeStrategies) {
        unsubscribeStrategies();
      }
      if (unsubscribeSettings) {
        unsubscribeSettings();
      }
    };
  },

  async updateStrategy(userId: string, strategyId: string, updates: Partial<UserStrategy>): Promise<void> {
    if (!userId || !strategyId) {
      throw new Error('Missing required parameters for strategy update');
    }

    try {
      const batch = writeBatch(db);
      const sanitizedData = transformStrategyForFirestore({
        ...updates,
        id: strategyId,
        lastModified: serverTimestamp()
      });
      
      // Update user's strategy customizations
      const strategyRef = doc(db, `${COLLECTIONS.USERS}/${userId}/userStrategies/${strategyId}`);
      batch.set(strategyRef, sanitizedData, { merge: true });

      // If isActive is being updated, update settings document
      if (typeof updates.isActive !== 'undefined') {
        const settingsRef = doc(db, `${COLLECTIONS.USERS}/${userId}/settings/strategies`);
        batch.set(settingsRef, {
          [strategyId]: { 
            isActive: updates.isActive,
            lastModified: serverTimestamp()
          }
        }, { merge: true });

        // Also update the user's selected strategies collection
        const selectedRef = doc(db, `${COLLECTIONS.USERS}/${userId}/selectedStrategies/${strategyId}`);
        if (updates.isActive) {
          batch.set(selectedRef, {
            strategyId,
            selectedAt: serverTimestamp(),
            lastModified: serverTimestamp()
          });
        } else {
          batch.delete(selectedRef);
        }
      }

      // Commit all changes atomically
      await batch.commit();
    } catch (error) {
      console.error('Error updating strategy:', error);
      throw error;
    }
  }
};
import { collection, doc, getDocs, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { COLLECTIONS } from './collections';
import { UserStrategy } from '../../types/strategy';
import { convertTimestampToDate } from '../../utils/firestoreConverters';
import { transformStrategyForFirestore } from '../../utils/strategyTransformer';

export const userStrategyService = {
  async getUserStrategySettings(userId: string): Promise<Record<string, Partial<UserStrategy>>> {
    if (!userId) {
      console.error('No user ID provided for strategy settings');
      return {};
    }

    try {
      const userStrategiesRef = collection(db, `${COLLECTIONS.USERS}/${userId}/${COLLECTIONS.USER_STRATEGIES}`);
      const querySnapshot = await getDocs(userStrategiesRef);
      
      const settings: Record<string, Partial<UserStrategy>> = {};
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        settings[doc.id] = transformStrategyForFirestore({
          id: doc.id,
          isActive: Boolean(data.isActive),
          customNotes: data.customNotes || '',
          targetSavings: Number(data.targetSavings) || 0,
          implementationDate: data.implementationDate || null,
          status: data.status || 'Not Started',
          customSteps: data.customSteps || [],
          timeline: {
            estimatedDuration: data.timeline?.estimatedDuration || '',
            phases: data.timeline?.phases || []
          },
          lastModified: convertTimestampToDate(data.lastModified || new Date())
        });
      });
      
      return settings;
    } catch (error) {
      console.error('Error getting user strategy settings:', error);
      return {};
    }
  },

  async updateStrategy(userId: string, strategyId: string, updates: Partial<UserStrategy>): Promise<void> {
    if (!userId || !strategyId) {
      throw new Error('Missing required parameters for strategy update');
    }

    try {
      const batch = writeBatch(db);
      const docRef = doc(db, `${COLLECTIONS.USERS}/${userId}/${COLLECTIONS.USER_STRATEGIES}`, strategyId);
      
      const cleanData = transformStrategyForFirestore({
        ...updates,
        lastModified: serverTimestamp()
      });
      
      batch.set(docRef, cleanData, { merge: true });

      // If isActive is being updated, ensure it's synced across all views
      if (typeof updates.isActive !== 'undefined') {
        const userSettingsRef = doc(db, `${COLLECTIONS.USERS}/${userId}/settings/strategies`);
        batch.set(userSettingsRef, {
          [strategyId]: { 
            isActive: updates.isActive,
            lastModified: serverTimestamp()
          }
        }, { merge: true });
      }

      await batch.commit();
    } catch (error) {
      console.error('Error updating strategy in Firestore:', error);
      throw error;
    }
  }
};
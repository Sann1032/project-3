import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { COLLECTIONS } from './collections';
import { convertTimestampToDate } from '../../utils/firestoreConverters';
import { UserStrategy } from '../../types/strategy';
import { transformStrategyForFirestore, initializeStrategy } from '../../utils/strategyTransformer';

export const baseStrategyService = {
  async getAllStrategies(): Promise<UserStrategy[]> {
    try {
      console.log('Fetching all strategies from main collection');
      const strategiesRef = collection(db, COLLECTIONS.STRATEGIES);
      const querySnapshot = await getDocs(strategiesRef);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return initializeStrategy({
          ...data,
          id: doc.id,
          isActive: false,
          dateCreated: convertTimestampToDate(data.dateCreated || new Date()),
          lastModified: convertTimestampToDate(data.lastModified || new Date())
        });
      });
    } catch (error) {
      console.error('Error fetching strategies:', error);
      // Return empty array instead of throwing to prevent UI breaks
      return [];
    }
  },

  async getStrategy(strategyId: string): Promise<UserStrategy | null> {
    if (!strategyId) {
      console.error('No strategy ID provided');
      return null;
    }

    try {
      const docRef = doc(db, COLLECTIONS.STRATEGIES, strategyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return initializeStrategy({
          ...data,
          id: docSnap.id,
          isActive: false,
          dateCreated: convertTimestampToDate(data.dateCreated || new Date()),
          lastModified: convertTimestampToDate(data.lastModified || new Date())
        });
      }
      return null;
    } catch (error) {
      console.error('Error fetching strategy:', error);
      return null;
    }
  }
};
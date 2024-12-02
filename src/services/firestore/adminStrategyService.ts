import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { TaxStrategy } from '../../types/strategy';
import { COLLECTIONS } from './collections';
import { transformStrategyForFirestore } from '../../utils/strategyTransformer';
import { convertTimestampToDate } from '../../utils/firestoreConverters';

export const adminStrategyService = {
  async getAllStrategies(): Promise<TaxStrategy[]> {
    const strategiesRef = collection(db, COLLECTIONS.STRATEGIES);
    const snapshot = await getDocs(strategiesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dateCreated: convertTimestampToDate(doc.data().dateCreated),
      lastModified: convertTimestampToDate(doc.data().lastModified)
    } as TaxStrategy));
  },

  async createStrategy(strategy: Omit<TaxStrategy, 'id' | 'dateCreated' | 'lastModified'>): Promise<TaxStrategy> {
    try {
      const strategiesRef = collection(db, COLLECTIONS.STRATEGIES);
      const cleanData = transformStrategyForFirestore({
        ...strategy,
        isActive: false,
        dateCreated: serverTimestamp(),
        lastModified: serverTimestamp(),
      });
      
      const docRef = await addDoc(strategiesRef, cleanData);
      
      return {
        id: docRef.id,
        ...strategy,
        isActive: false,
        dateCreated: new Date(),
        lastModified: new Date()
      };
    } catch (error) {
      console.error('Error creating strategy:', error);
      throw error;
    }
  },

  async updateStrategy(id: string, updates: Partial<TaxStrategy>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.STRATEGIES, id);
      const cleanData = transformStrategyForFirestore({
        ...updates,
        lastModified: serverTimestamp(),
      });
      await updateDoc(docRef, cleanData);
    } catch (error) {
      console.error('Error updating strategy:', error);
      throw error;
    }
  },

  async deleteStrategy(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.STRATEGIES, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting strategy:', error);
      throw error;
    }
  },
};
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Entity } from '../../types/estate';

export const estateService = {
  async getEntities(userId: string): Promise<Entity[]> {
    try {
      const entitiesRef = collection(db, `users/${userId}/estateEntities`);
      const snapshot = await getDocs(entitiesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Entity));
    } catch (error) {
      console.error('Error fetching entities:', error);
      throw error;
    }
  },

  async saveEntity(userId: string, entity: Omit<Entity, 'id'>): Promise<string> {
    try {
      const entitiesRef = collection(db, `users/${userId}/estateEntities`);
      const docRef = doc(entitiesRef);
      
      await setDoc(docRef, {
        ...entity,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error saving entity:', error);
      throw error;
    }
  },

  async updateEntity(userId: string, entityId: string, updates: Partial<Entity>): Promise<void> {
    try {
      const entityRef = doc(db, `users/${userId}/estateEntities/${entityId}`);
      await updateDoc(entityRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating entity:', error);
      throw error;
    }
  },

  async deleteEntity(userId: string, entityId: string): Promise<void> {
    try {
      const entityRef = doc(db, `users/${userId}/estateEntities/${entityId}`);
      await deleteDoc(entityRef);
    } catch (error) {
      console.error('Error deleting entity:', error);
      throw error;
    }
  },

  async saveEntityLayout(userId: string, layout: any): Promise<void> {
    try {
      const layoutRef = doc(db, `users/${userId}/estateEntities/layout`);
      await setDoc(layoutRef, {
        positions: layout,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving layout:', error);
      throw error;
    }
  },

  async getEntityLayout(userId: string): Promise<any> {
    try {
      const layoutRef = doc(db, `users/${userId}/estateEntities/layout`);
      const snapshot = await getDocs(query(collection(db, `users/${userId}/estateEntities`), where('type', '==', 'layout')));
      return snapshot.docs[0]?.data()?.positions || null;
    } catch (error) {
      console.error('Error fetching layout:', error);
      return null;
    }
  }
};
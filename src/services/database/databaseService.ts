import { 
  doc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  WriteBatch,
  writeBatch
} from 'firebase/firestore';
import { db } from '../../config/firebase';

interface DatabaseUpdate {
  collection: string;
  docId: string;
  data: any;
  merge?: boolean;
}

interface BatchOperation {
  type: 'set' | 'update';
  collection: string;
  docId: string;
  data: any;
  merge?: boolean;
}

export const databaseService = {
  // Add a new document
  async addDocument(collectionName: string, docId: string, data: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docId;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  },

  // Update an existing document
  async updateDocument(collectionName: string, docId: string, data: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Batch write multiple documents
  async batchWrite(operations: BatchOperation[]) {
    const batch: WriteBatch = writeBatch(db);

    try {
      operations.forEach(op => {
        const docRef = doc(db, op.collection, op.docId);
        const dataWithTimestamp = {
          ...op.data,
          updatedAt: serverTimestamp()
        };

        if (op.type === 'set') {
          batch.set(docRef, {
            ...dataWithTimestamp,
            createdAt: serverTimestamp()
          }, { merge: op.merge });
        } else {
          batch.update(docRef, dataWithTimestamp);
        }
      });

      await batch.commit();
    } catch (error) {
      console.error('Error in batch write:', error);
      throw error;
    }
  },

  // Update nested fields
  async updateNestedField(collectionName: string, docId: string, fieldPath: string, value: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        [fieldPath]: value,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(`Error updating nested field in ${collectionName}:`, error);
      throw error;
    }
  },

  // Add field to existing document
  async addField(collectionName: string, docId: string, fieldName: string, value: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        [fieldName]: value,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(`Error adding field to document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Query documents
  async queryDocuments(collectionName: string, conditions: { field: string; operator: any; value: any }[]) {
    try {
      const collectionRef = collection(db, collectionName);
      const constraints = conditions.map(({ field, operator, value }) => 
        where(field, operator, value)
      );
      
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying documents in ${collectionName}:`, error);
      throw error;
    }
  }
};
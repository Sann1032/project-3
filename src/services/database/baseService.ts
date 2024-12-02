import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  DocumentReference 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DatabaseError, handleDatabaseError } from '../../utils/validation';

export class BaseService {
  constructor(protected collection: string) {}

  protected async validateDocumentExists(docRef: DocumentReference): Promise<void> {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new DatabaseError(
        `Document does not exist`,
        'not-found',
        'validate',
        this.collection,
        docRef.id
      );
    }
  }

  protected async addDocument(docId: string, data: any, merge = false) {
    try {
      const docRef = doc(db, this.collection, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge });
      return docId;
    } catch (error) {
      throw handleDatabaseError(error, 'create', this.collection, docId);
    }
  }

  protected async updateDocument(docId: string, data: any) {
    try {
      const docRef = doc(db, this.collection, docId);
      await this.validateDocumentExists(docRef);
      
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw handleDatabaseError(error, 'update', this.collection, docId);
    }
  }

  protected async deleteDocument(docId: string) {
    try {
      const docRef = doc(db, this.collection, docId);
      await this.validateDocumentExists(docRef);
      await deleteDoc(docRef);
    } catch (error) {
      throw handleDatabaseError(error, 'delete', this.collection, docId);
    }
  }

  protected async getDocument(docId: string) {
    try {
      const docRef = doc(db, this.collection, docId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error) {
      throw handleDatabaseError(error, 'read', this.collection, docId);
    }
  }
}
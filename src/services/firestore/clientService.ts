import { db } from '../../config/firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ClientInformation } from '../../types/client';
import { validateClientInfo, sanitizeForFirestore } from '../../utils/databaseValidation';

const COLLECTION_NAME = 'clients';

export const clientService = {
  async saveClientInfo(userId: string, clientInfo: ClientInformation): Promise<void> {
    const validatedInfo = validateClientInfo(clientInfo);
    const sanitizedData = sanitizeForFirestore({
      ...validatedInfo,
      lastModified: serverTimestamp()
    });

    const docRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(docRef, sanitizedData);
  },

  async getClientInfo(userId: string): Promise<ClientInformation | null> {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return validateClientInfo(docSnap.data() as ClientInformation);
    }
    return null;
  },

  async updateClientInfo(userId: string, updates: Partial<ClientInformation>): Promise<void> {
    const validatedUpdates = validateClientInfo(updates);
    const sanitizedData = sanitizeForFirestore({
      ...validatedUpdates,
      lastModified: serverTimestamp()
    });

    const docRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(docRef, sanitizedData);
  }
};
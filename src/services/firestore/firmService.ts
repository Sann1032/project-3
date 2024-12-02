import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ClientInformation } from '../../types/client';

export const firmService = {
  async getFirmClients(firmId: string): Promise<ClientInformation[]> {
    try {
      const clientsRef = collection(db, 'firms', firmId, 'clients');
      const snapshot = await getDocs(clientsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ClientInformation));
    } catch (error) {
      console.error('Error getting firm clients:', error);
      throw error;
    }
  },

  async addClient(firmId: string, clientData: Partial<ClientInformation>): Promise<ClientInformation> {
    try {
      const clientsRef = collection(db, 'firms', firmId, 'clients');
      const docRef = doc(clientsRef);
      
      const newClient = {
        ...clientData,
        firmId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, newClient);

      return {
        id: docRef.id,
        ...newClient
      } as ClientInformation;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  },

  async deleteClient(firmId: string, clientId: string): Promise<void> {
    try {
      const clientRef = doc(db, 'firms', firmId, 'clients', clientId);
      await deleteDoc(clientRef);
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },

  async updateClient(firmId: string, clientId: string, updates: Partial<ClientInformation>): Promise<void> {
    try {
      const clientRef = doc(db, 'firms', firmId, 'clients', clientId);
      await updateDoc(clientRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }
};
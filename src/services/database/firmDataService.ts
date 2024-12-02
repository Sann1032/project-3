import { databaseService } from './databaseService';
import { ClientInformation } from '../../types/client';

export const firmDataService = {
  // Save firm information
  async saveFirmInfo(firmId: string, firmData: any) {
    try {
      await databaseService.addDocument('firms', firmId, firmData);
    } catch (error) {
      console.error('Error saving firm information:', error);
      throw error;
    }
  },

  // Add client to firm
  async addClientToFirm(firmId: string, clientData: ClientInformation) {
    try {
      const clientId = `${firmId}_${Date.now()}`;
      await databaseService.batchWrite([
        {
          type: 'set',
          collection: 'clients',
          docId: clientId,
          data: { ...clientData, firmId }
        },
        {
          type: 'update',
          collection: 'firms',
          docId: firmId,
          data: {
            clients: databaseService.arrayUnion(clientId)
          }
        }
      ]);
      return clientId;
    } catch (error) {
      console.error('Error adding client to firm:', error);
      throw error;
    }
  },

  // Update client information
  async updateFirmClientInfo(firmId: string, clientId: string, updates: Partial<ClientInformation>) {
    try {
      await databaseService.updateDocument('clients', clientId, {
        ...updates,
        firmId // Ensure firmId remains unchanged
      });
    } catch (error) {
      console.error('Error updating firm client information:', error);
      throw error;
    }
  },

  // Get firm clients
  async getFirmClients(firmId: string) {
    try {
      return await databaseService.queryDocuments('clients', [
        { field: 'firmId', operator: '==', value: firmId }
      ]);
    } catch (error) {
      console.error('Error getting firm clients:', error);
      throw error;
    }
  },

  // Update firm settings
  async updateFirmSettings(firmId: string, settings: any) {
    try {
      await databaseService.updateDocument('firms', firmId, { settings });
    } catch (error) {
      console.error('Error updating firm settings:', error);
      throw error;
    }
  }
};
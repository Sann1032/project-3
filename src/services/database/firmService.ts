import { BaseService } from './baseService';
import { validateClient } from '../../utils/validation';
import { generateId } from '../../utils/idGenerator';
import { ClientInformation } from '../../types/client';
import { writeBatch, doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DatabaseError } from '../../utils/validation';

export class FirmService extends BaseService {
  constructor() {
    super('firms');
  }

  async createFirm(data: any): Promise<string> {
    const firmId = generateId('firm');
    await this.addDocument(firmId, data);
    return firmId;
  }

  async addClientToFirm(firmId: string, clientData: Partial<ClientInformation>): Promise<string> {
    const batch = writeBatch(db);

    try {
      const firmRef = doc(db, this.collection, firmId);
      await this.validateDocumentExists(firmRef);

      const clientId = generateId('client');
      const validatedData = validateClient(clientData);
      const clientRef = doc(collection(db, 'clients'), clientId);

      batch.set(clientRef, {
        ...validatedData,
        id: clientId,
        firmId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      batch.update(firmRef, {
        clients: [...(await this.getFirmClients(firmId)), clientId],
        updatedAt: new Date()
      });

      await batch.commit();
      return clientId;
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(
        'Failed to add client to firm',
        'batch-write-failed',
        'create',
        'firms',
        firmId
      );
    }
  }

  private async getFirmClients(firmId: string): Promise<string[]> {
    const firmDoc = await getDoc(doc(db, this.collection, firmId));
    return firmDoc.exists() ? (firmDoc.data().clients || []) : [];
  }
}

export const firmService = new FirmService();
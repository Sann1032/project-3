import { BaseService } from './baseService';
import { validateClient } from '../../utils/validation';
import { generateId } from '../../utils/idGenerator';
import { ClientInformation } from '../../types/client';

export class ClientService extends BaseService {
  constructor() {
    super('clients');
  }

  async createClient(data: Partial<ClientInformation>): Promise<string> {
    const clientId = generateId('client');
    const validatedData = validateClient(data);
    await this.addDocument(clientId, validatedData);
    return clientId;
  }

  async updateClient(clientId: string, data: Partial<ClientInformation>) {
    const validatedData = validateClient(data);
    await this.updateDocument(clientId, validatedData);
  }

  async getClient(clientId: string) {
    const client = await this.getDocument(clientId);
    return client ? validateClient(client) : null;
  }

  async deleteClient(clientId: string) {
    await this.deleteDocument(clientId);
  }
}

export const clientService = new ClientService();
import { useState } from 'react';
import { firmDataService } from '../services/database';
import { ClientInformation } from '../types/client';

export const useFirmData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addClientToFirm = async (firmId: string, clientData: ClientInformation) => {
    setLoading(true);
    setError(null);
    try {
      const clientId = await firmDataService.addClientToFirm(firmId, clientData);
      return clientId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding client to firm');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFirmClientInfo = async (
    firmId: string,
    clientId: string,
    updates: Partial<ClientInformation>
  ) => {
    setLoading(true);
    setError(null);
    try {
      await firmDataService.updateFirmClientInfo(firmId, clientId, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating client information');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFirmClients = async (firmId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await firmDataService.getFirmClients(firmId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching firm clients');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    addClientToFirm,
    updateFirmClientInfo,
    getFirmClients,
    loading,
    error
  };
};
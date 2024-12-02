import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ClientInformation } from '../types/client';
import { firmService } from '../services/firestore/firmService';

export const useClientList = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<ClientInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      if (!user?.firmId) return;

      try {
        setLoading(true);
        const firmClients = await firmService.getFirmClients(user.firmId);
        setClients(firmClients);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading clients');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, [user]);

  const addClient = async (clientData: Partial<ClientInformation>) => {
    if (!user?.firmId) return;

    try {
      const newClient = await firmService.addClient(user.firmId, clientData);
      setClients([...clients, newClient]);
      return newClient;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding client');
      throw err;
    }
  };

  const deleteClient = async (clientId: string) => {
    if (!user?.firmId) return;

    try {
      await firmService.deleteClient(user.firmId, clientId);
      setClients(clients.filter(client => client.personalInfo.email !== clientId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting client');
      throw err;
    }
  };

  return {
    clients,
    loading,
    error,
    addClient,
    deleteClient
  };
};
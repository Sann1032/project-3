import { useState, useEffect } from 'react';
import { ClientInformation, TaxGoal } from '../types/client';
import { clientService } from '../services/firestore/clientService';
import { useAuth } from './useAuth';

const initialClientInfo: ClientInformation = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    filingStatus: 'Single',
    dependents: 0,
  },
  financialInfo: {
    annualIncome: 0,
    employmentType: 'W2 Employee',
    hasBusinessIncome: false,
    hasInvestmentIncome: false,
    hasRentalIncome: false,
    retirementContributions: 0,
  },
  goals: [],
};

export const useClientInfo = () => {
  const { user } = useAuth();
  const [clientInfo, setClientInfo] = useState<ClientInformation>(initialClientInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientInfo = async () => {
      if (!user?.uid) return;

      try {
        const savedInfo = await clientService.getClientInfo(user.uid);
        if (savedInfo) {
          setClientInfo({
            ...initialClientInfo,
            ...savedInfo,
            personalInfo: {
              ...initialClientInfo.personalInfo,
              ...(savedInfo.personalInfo || {}),
            },
            financialInfo: {
              ...initialClientInfo.financialInfo,
              ...(savedInfo.financialInfo || {}),
            },
            goals: savedInfo.goals || [],
          });
        } else {
          // Initialize with user's auth info
          const newClientInfo = {
            ...initialClientInfo,
            personalInfo: {
              ...initialClientInfo.personalInfo,
              name: user.displayName || '',
              email: user.email || '',
            }
          };
          await clientService.saveClientInfo(user.uid, newClientInfo);
          setClientInfo(newClientInfo);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadClientInfo();
  }, [user]);

  const updateClientInfo = async (updates: Partial<ClientInformation>) => {
    if (!user?.uid) return;

    try {
      const updated = {
        ...clientInfo,
        ...updates,
        personalInfo: {
          ...clientInfo.personalInfo,
          ...(updates.personalInfo || {}),
        },
        financialInfo: {
          ...clientInfo.financialInfo,
          ...(updates.financialInfo || {}),
        },
      };

      await clientService.updateClientInfo(user.uid, updated);
      setClientInfo(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating');
    }
  };

  const addGoal = async (goal: TaxGoal) => {
    if (!user?.uid) return;

    try {
      const updated = {
        ...clientInfo,
        goals: [...(clientInfo.goals || []), goal],
      };
      await clientService.updateClientInfo(user.uid, updated);
      setClientInfo(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding goal');
    }
  };

  return {
    clientInfo,
    updateClientInfo,
    addGoal,
    loading,
    error,
  };
};
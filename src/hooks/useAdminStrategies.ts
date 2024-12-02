import { useState, useEffect } from 'react';
import { TaxStrategy } from '../types/strategy';
import { adminStrategyService } from '../services/firestore/adminStrategyService';

export const useAdminStrategies = () => {
  const [strategies, setStrategies] = useState<TaxStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStrategies = async () => {
      try {
        const data = await adminStrategyService.getAllStrategies();
        setStrategies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load strategies');
      } finally {
        setLoading(false);
      }
    };

    loadStrategies();
  }, []);

  const createStrategy = async (strategy: Omit<TaxStrategy, 'id'>) => {
    try {
      const newStrategy = await adminStrategyService.createStrategy(strategy);
      setStrategies([...strategies, newStrategy]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create strategy');
      throw err;
    }
  };

  const updateStrategy = async (id: string, updates: Partial<TaxStrategy>) => {
    try {
      await adminStrategyService.updateStrategy(id, updates);
      setStrategies(strategies.map(s => 
        s.id === id ? { ...s, ...updates } : s
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update strategy');
      throw err;
    }
  };

  const deleteStrategy = async (id: string) => {
    try {
      await adminStrategyService.deleteStrategy(id);
      setStrategies(strategies.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete strategy');
      throw err;
    }
  };

  return {
    strategies,
    createStrategy,
    updateStrategy,
    deleteStrategy,
    loading,
    error,
  };
};
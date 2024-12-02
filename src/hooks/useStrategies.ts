import { useState, useEffect, useCallback } from 'react';
import { UserStrategy } from '../types/strategy';
import { strategyService } from '../services/firestore/strategyService';
import { adminStrategyService } from '../services/firestore/adminStrategyService';
import { useAuth } from './useAuth';

export const useStrategies = () => {
  const { user } = useAuth();
  const [strategies, setStrategies] = useState<UserStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupStrategyListener = async () => {
      if (!user?.uid) return;

      try {
        console.log('Setting up strategy listener for user:', user.uid);
        unsubscribe = strategyService.subscribeToStrategies(user.uid, (updatedStrategies) => {
          console.log('Strategies updated:', updatedStrategies.length);
          setStrategies(updatedStrategies);
          setLoading(false);
        });
      } catch (err) {
        console.error('Error loading strategies:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    setupStrategyListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const toggleStrategy = useCallback(async (id: string) => {
    if (!user?.uid) return;

    try {
      const strategy = strategies.find(s => s.id === id);
      if (strategy) {
        const newIsActive = !strategy.isActive;
        
        setStrategies(prevStrategies => 
          prevStrategies.map(s => 
            s.id === id ? { ...s, isActive: newIsActive } : s
          )
        );

        await strategyService.updateStrategy(user.uid, id, {
          isActive: newIsActive,
          lastModified: new Date()
        });
      }
    } catch (err) {
      console.error('Error toggling strategy:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while toggling strategy');
      
      setStrategies(prevStrategies => 
        prevStrategies.map(s => 
          s.id === id ? { ...s, isActive: !s.isActive } : s
        )
      );
    }
  }, [user, strategies]);

  const updateStrategyNotes = useCallback(async (id: string, notes: string) => {
    if (!user?.uid) return;

    try {
      setStrategies(prevStrategies => 
        prevStrategies.map(s => 
          s.id === id ? { ...s, customNotes: notes } : s
        )
      );

      await strategyService.updateStrategy(user.uid, id, {
        customNotes: notes,
        lastModified: new Date()
      });
    } catch (err) {
      console.error('Error updating strategy notes:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating notes');
    }
  }, [user]);

  const updateStrategy = useCallback(async (id: string, updates: Partial<UserStrategy>) => {
    if (!user?.uid) return;

    try {
      if (id === 'new') {
        const newStrategy = await adminStrategyService.createStrategy(updates);
        setStrategies(prev => [...prev, newStrategy]);
      } else {
        await adminStrategyService.updateStrategy(id, updates);
        setStrategies(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
      }
    } catch (err) {
      console.error('Error updating strategy:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating strategy');
      throw err;
    }
  }, [user]);

  const deleteStrategy = useCallback(async (id: string) => {
    if (!user?.uid) return;

    try {
      await adminStrategyService.deleteStrategy(id);
      setStrategies(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting strategy:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while deleting strategy');
      throw err;
    }
  }, [user]);

  return {
    strategies,
    toggleStrategy,
    updateStrategyNotes,
    updateStrategy,
    deleteStrategy,
    loading,
    error,
  };
};
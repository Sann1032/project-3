import { useState, useEffect } from 'react';
import { Entity } from '../types/estate';
import { estateService } from '../services/firestore/estateService';
import { useAuth } from './useAuth';

export const useEstateEntities = () => {
  const { user } = useAuth();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntities = async () => {
      if (!user?.uid) return;

      try {
        const data = await estateService.getEntities(user.uid);
        setEntities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load entities');
      } finally {
        setLoading(false);
      }
    };

    loadEntities();
  }, [user]);

  const saveEntity = async (entity: Omit<Entity, 'id'>) => {
    if (!user?.uid) return;

    try {
      const id = await estateService.saveEntity(user.uid, entity);
      setEntities([...entities, { ...entity, id }]);
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entity');
      throw err;
    }
  };

  const updateEntity = async (id: string, updates: Partial<Entity>) => {
    if (!user?.uid) return;

    try {
      await estateService.updateEntity(user.uid, id, updates);
      setEntities(entities.map(e => e.id === id ? { ...e, ...updates } : e));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update entity');
      throw err;
    }
  };

  const deleteEntity = async (id: string) => {
    if (!user?.uid) return;

    try {
      await estateService.deleteEntity(user.uid, id);
      setEntities(entities.filter(e => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entity');
      throw err;
    }
  };

  const saveLayout = async (layout: any) => {
    if (!user?.uid) return;

    try {
      await estateService.saveEntityLayout(user.uid, layout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save layout');
      throw err;
    }
  };

  return {
    entities,
    loading,
    error,
    saveEntity,
    updateEntity,
    deleteEntity,
    saveLayout
  };
};
import { useState, useCallback } from 'react';
import { Entity } from '../types/estate';
import { DropResult } from '@hello-pangea/dnd';

interface Position {
  x: number;
  y: number;
}

interface EntityWithPosition extends Entity {
  position?: Position;
}

const initialEntities: EntityWithPosition[] = [
  {
    id: '1',
    name: 'Tech Consulting LLC',
    type: 'active',
    description: 'IT consulting services',
    ownership: '100% S-Corp Holdings',
    revenue: 500000,
  },
  {
    id: '2',
    name: 'Real Estate Holdings LLC',
    type: 'passive',
    description: 'Commercial property rentals',
    ownership: '100% LLC Holdings',
    revenue: 300000,
  },
  {
    id: '3',
    name: 'Software Development Inc',
    type: 'active',
    description: 'Custom software solutions',
    ownership: '100% S-Corp Holdings',
    revenue: 750000,
  },
  {
    id: '4',
    name: 'Investment Portfolio LLC',
    type: 'passive',
    description: 'Stock and bond investments',
    ownership: '100% LLC Holdings',
    revenue: 250000,
  }
];

export const useEntities = () => {
  const [entities, setEntities] = useState<EntityWithPosition[]>(initialEntities);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const items = Array.from(entities);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setEntities(items);
  }, [entities]);

  const updateEntityPosition = useCallback((id: string, position: Position) => {
    setEntities(prev => 
      prev.map(entity => 
        entity.id === id ? { ...entity, position } : entity
      )
    );
  }, []);

  return {
    entities,
    setEntities,
    handleDragEnd,
    updateEntityPosition
  };
};
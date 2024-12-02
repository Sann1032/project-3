import React from 'react';
import { DollarSign, Info } from 'lucide-react';
import { Entity } from '../../types/estate';

interface EntityCardProps {
  entity: Entity;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{entity.name}</h3>
        <Info className="w-4 h-4 text-gray-400 cursor-help" />
      </div>
      <p className="text-sm text-gray-600 mb-3">{entity.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{entity.ownership}</span>
        <div className="flex items-center text-green-600">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>{entity.revenue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
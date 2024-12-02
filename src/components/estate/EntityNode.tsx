import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { DollarSign } from 'lucide-react';

interface EntityNodeData {
  name: string;
  type: 'active' | 'real estate' | 'retirement' | 'investment';
  revenue?: number;
  ownership: string;
  description: string;
}

interface EntityNodeProps {
  data: EntityNodeData;
}

export const EntityNode = memo(({ data }: EntityNodeProps) => {
  const colorClasses = {
    active: {
      border: 'border-blue-200',
      bg: 'bg-white hover:bg-blue-50',
      text: 'text-blue-600'
    },
    'real estate': {
      border: 'border-green-200',
      bg: 'bg-white hover:bg-green-50',
      text: 'text-green-600'
    },
    retirement: {
      border: 'border-purple-200',
      bg: 'bg-white hover:bg-purple-50',
      text: 'text-purple-600'
    },
    investment: {
      border: 'border-indigo-200',
      bg: 'bg-white hover:bg-indigo-50',
      text: 'text-indigo-600'
    }
  };

  const colors = colorClasses[data.type];

  return (
    <div className={`p-4 rounded-lg shadow-md border-2 ${colors.border} ${colors.bg} min-w-[200px]`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      <div className="flex flex-col space-y-2">
        <h3 className="font-medium text-gray-900">{data.name}</h3>
        {data.revenue !== undefined && (
          <div className={`flex items-center ${colors.text}`}>
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{data.revenue.toLocaleString()}</span>
          </div>
        )}
        <p className="text-sm text-gray-500">{data.description}</p>
        <p className="text-xs text-gray-400">{data.ownership}</p>
      </div>
    </div>
  );
});

EntityNode.displayName = 'EntityNode';
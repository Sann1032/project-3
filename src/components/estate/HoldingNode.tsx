import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Building2 } from 'lucide-react';

export const HoldingNode = memo(({ data }: any) => {
  const colors = {
    active: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600'
    },
    passive: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    }
  };

  const style = colors[data.type];

  return (
    <div className={`p-4 rounded-lg shadow-md ${style.bg} border-2 ${style.border} min-w-[200px]`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      <div className="flex items-center space-x-2 mb-2">
        <Building2 className={`w-5 h-5 ${style.icon}`} />
        <h3 className={`font-medium ${style.text}`}>{data.label}</h3>
      </div>
    </div>
  );
});

HoldingNode.displayName = 'HoldingNode';
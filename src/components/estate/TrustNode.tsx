import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Shield } from 'lucide-react';

export const TrustNode = memo(({ data }: any) => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-purple-50 border-2 border-purple-200 min-w-[250px]">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      <div className="flex items-center space-x-3 mb-2">
        <Shield className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-purple-800">Revocable Living Trust</h3>
      </div>
      <p className="text-sm text-purple-600">Asset Protection & Estate Planning</p>
    </div>
  );
});

TrustNode.displayName = 'TrustNode';
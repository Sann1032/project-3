import React, { memo } from 'react';

export const DividerNode = memo(() => {
  return (
    <div className="relative w-[800px] h-[40px] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-gray-300"></div>
      </div>
    </div>
  );
});

DividerNode.displayName = 'DividerNode';
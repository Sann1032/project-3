import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export const TrustColumn: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">Trust Structure</h2>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="font-medium text-purple-800">Family Trust</h3>
        <p className="text-sm text-purple-600">Asset protection & estate planning</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>S-Corp Holdings</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>LLC Holdings</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
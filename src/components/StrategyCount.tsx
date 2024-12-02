import React from 'react';
import { UserStrategy } from '../types/strategy';
import { Calculator, CheckCircle2, Clock, DollarSign } from 'lucide-react';

interface StrategyCountProps {
  strategies: UserStrategy[];
}

export const StrategyCount: React.FC<StrategyCountProps> = ({ strategies }) => {
  const selectedStrategies = strategies.filter(s => s.isActive);
  const totalSavings = selectedStrategies.reduce(
    (sum, strategy) => sum + (strategy.targetSavings || strategy.estimatedSavings),
    0
  );
  
  const getStatusCounts = () => {
    return selectedStrategies.reduce((acc, strategy) => {
      const status = strategy.status || 'Not Started';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-600">Selected Strategies</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{selectedStrategies.length}</p>
        <p className="text-xs text-gray-500">of {strategies.length} available</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="text-sm font-medium text-gray-600">Total Potential Savings</h3>
        </div>
        <p className="text-2xl font-bold text-green-600">
          ${totalSavings.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">estimated annual savings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {statusCounts['Completed'] || 0}
        </p>
        <p className="text-xs text-gray-500">strategies implemented</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {statusCounts['In Progress'] || 0}
        </p>
        <p className="text-xs text-gray-500">strategies being implemented</p>
      </div>
    </div>
  );
};
import React from 'react';
import { UserStrategy } from '../../types/strategy';
import { Settings, DollarSign } from 'lucide-react';

interface StrategySettingsProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategySettings: React.FC<StrategySettingsProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Strategy Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Savings Amount
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={strategy.targetSavings || strategy.estimatedSavings}
                onChange={(e) => onUpdateStrategy(strategy.id, { 
                  targetSavings: parseFloat(e.target.value) 
                })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={strategy.status || 'Not Started'}
              onChange={(e) => onUpdateStrategy(strategy.id, { 
                status: e.target.value as 'Not Started' | 'In Progress' | 'Completed' 
              })}
              className="w-full p-2 border rounded-md"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={strategy.customNotes || ''}
              onChange={(e) => onUpdateStrategy(strategy.id, { 
                customNotes: e.target.value 
              })}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add any additional notes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
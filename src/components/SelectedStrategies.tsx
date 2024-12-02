import React from 'react';
import { StrategyCard } from './StrategyCard';
import { UserStrategy } from '../types/strategy';

interface SelectedStrategiesProps {
  strategies: UserStrategy[];
  onToggleStrategy: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const SelectedStrategies: React.FC<SelectedStrategiesProps> = ({
  strategies,
  onToggleStrategy,
  onUpdateNotes,
}) => {
  const totalSavings = strategies.reduce((sum, strategy) => sum + strategy.estimatedSavings, 0);

  return (
    <div className="space-y-4">
      {strategies.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No strategies selected. Select strategies from the available list to build your plan.
        </p>
      ) : (
        <>
          <div className="bg-green-50 p-4 rounded-md mb-4">
            <p className="text-green-800 font-medium">
              Total Estimated Savings: ${totalSavings.toLocaleString()}
            </p>
          </div>
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onToggle={onToggleStrategy}
              onUpdateNotes={onUpdateNotes}
            />
          ))}
        </>
      )}
    </div>
  );
};
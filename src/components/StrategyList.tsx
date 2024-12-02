import React, { useState } from 'react';
import { StrategyCard } from './StrategyCard';
import { StrategyDetails } from './StrategyDetails';
import { UserStrategy } from '../types/strategy';
import { Search } from 'lucide-react';

interface StrategyListProps {
  strategies: UserStrategy[];
  onToggleStrategy: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onUpdateStrategy?: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyList: React.FC<StrategyListProps> = ({
  strategies,
  onToggleStrategy,
  onUpdateNotes,
  onUpdateStrategy
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStrategy = (id: string, updates: Partial<UserStrategy>) => {
    if (onUpdateStrategy) {
      onUpdateStrategy(id, updates);
    }
  };

  const filteredStrategies = strategies.filter((strategy) =>
    strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    strategy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {selectedStrategy ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedStrategy(null)}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <span>← Back to List</span>
          </button>
          <StrategyDetails
            strategy={strategies.find(s => s.id === selectedStrategy)!}
            onUpdateStrategy={handleUpdateStrategy}
          />
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-4">
            {filteredStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onToggle={onToggleStrategy}
                onUpdateNotes={onUpdateNotes}
                onClick={() => setSelectedStrategy(strategy.id)}
              />
            ))}
            {filteredStrategies.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No strategies found matching your search.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
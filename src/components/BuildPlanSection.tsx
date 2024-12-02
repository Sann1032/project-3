import React, { useState } from 'react';
import { StrategyList } from './strategy/StrategyList';
import { SelectedStrategies } from './strategy/SelectedStrategies';
import { StrategyCount } from './strategy/StrategyCount';
import { useStrategies } from '../hooks/useStrategies';
import { useAuth } from '../hooks/useAuth';
import { ClipboardCheck, Plus, Edit2 } from 'lucide-react';
import { StrategyForm } from './strategy/StrategyForm';
import { EditStrategyForm } from './strategy/EditStrategyForm';
import { UserStrategy } from '../types/strategy';

export const BuildPlanSection: React.FC = () => {
  const { user } = useAuth();
  const { strategies, toggleStrategy, updateStrategyNotes, updateStrategy, loading, error } = useStrategies();
  const [isAddingStrategy, setIsAddingStrategy] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<UserStrategy | null>(null);

  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';
  const selectedStrategies = strategies.filter((s) => s.isActive);
  const availableStrategies = strategies.filter((s) => !s.isActive);

  const handleEditStrategy = (strategy: UserStrategy) => {
    setEditingStrategy(strategy);
  };

  const handleUpdateStrategy = async (id: string, updates: Partial<UserStrategy>) => {
    try {
      await updateStrategy(id, updates);
      setEditingStrategy(null);
    } catch (error) {
      console.error('Error updating strategy:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        Error loading strategies: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ClipboardCheck className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Build Your Tax Plan</h2>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsAddingStrategy(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Add Strategy</span>
          </button>
        )}
      </div>

      <StrategyCount strategies={strategies} />

      {isAddingStrategy ? (
        <StrategyForm
          onSubmit={async (strategyData) => {
            try {
              await updateStrategy('new', strategyData);
              setIsAddingStrategy(false);
            } catch (error) {
              console.error('Error saving strategy:', error);
            }
          }}
          onCancel={() => setIsAddingStrategy(false)}
        />
      ) : editingStrategy ? (
        <EditStrategyForm
          strategy={editingStrategy}
          onSubmit={(updates) => handleUpdateStrategy(editingStrategy.id, updates)}
          onCancel={() => setEditingStrategy(null)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Strategies</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              <StrategyList
                strategies={availableStrategies}
                onToggleStrategy={toggleStrategy}
                onUpdateNotes={updateStrategyNotes}
                onEditStrategy={isAdmin ? handleEditStrategy : undefined}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Strategies</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              <SelectedStrategies
                strategies={selectedStrategies}
                onToggleStrategy={toggleStrategy}
                onUpdateNotes={updateStrategyNotes}
                onEditStrategy={isAdmin ? handleEditStrategy : undefined}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
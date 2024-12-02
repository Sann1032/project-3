import React, { useState, useCallback, memo } from 'react';
import { UserStrategy } from '../../types/strategy';
import { CheckCircle, Circle, ChevronDown, ChevronUp, DollarSign, Calendar, Clock, Edit2 } from 'lucide-react';

interface StrategyCardProps {
  strategy: UserStrategy;
  onToggle: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onEditStrategy?: (strategy: UserStrategy) => void;
  onClick?: () => void;
}

export const StrategyCard = memo<StrategyCardProps>(({
  strategy,
  onToggle,
  onUpdateNotes,
  onEditStrategy,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(strategy.customNotes || '');

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    onUpdateNotes(strategy.id, newNotes);
  }, [strategy.id, onUpdateNotes]);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(strategy.id);
  }, [strategy.id, onToggle]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEditStrategy?.(strategy);
  }, [strategy, onEditStrategy]);

  const handleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (!e.target || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('textarea')) {
      return;
    }
    onClick?.();
  }, [onClick]);

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggle}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {strategy.isActive ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
            <p className="text-sm text-gray-600">{strategy.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center text-green-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">
                {(strategy.targetSavings || strategy.estimatedSavings).toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-gray-500">Target Savings</span>
          </div>
          {onEditStrategy && (
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleExpand}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {strategy.implementationDate
                  ? new Date(strategy.implementationDate).toLocaleDateString()
                  : 'No date set'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className={`text-sm px-2 py-1 rounded-full ${
                strategy.status === 'Completed' ? 'bg-green-100 text-green-800' :
                strategy.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {strategy.status || 'Not Started'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Implementation Steps:</h4>
            {(strategy.customSteps || strategy.steps || []).map((step) => (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  step.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`} />
                <p className={`text-sm ${step.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              onClick={(e) => e.stopPropagation()}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Add your notes here..."
            />
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Created: {new Date(strategy.dateCreated).toLocaleDateString()}</p>
            <p>Last modified: {new Date(strategy.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
});

StrategyCard.displayName = 'StrategyCard';
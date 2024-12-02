import React, { useState } from 'react';
import { UserStrategy, TimelinePhase } from '../../types/strategy';
import { Calendar, Plus, Trash2 } from 'lucide-react';

interface StrategyTimelineProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyTimeline: React.FC<StrategyTimelineProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    strategy.implementationDate || new Date().toISOString().split('T')[0]
  );

  const steps = strategy.customSteps || strategy.steps || [];
  const timeline = strategy.timeline || { estimatedDuration: '', phases: [] };
  const phases = timeline.phases || [];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onUpdateStrategy(strategy.id, {
      implementationDate: date,
    });
  };

  const handleStatusChange = (status: 'Not Started' | 'In Progress' | 'Completed') => {
    onUpdateStrategy(strategy.id, { status });
  };

  const handleAddPhase = () => {
    const newPhase: TimelinePhase = {
      id: Date.now().toString(),
      name: '',
      duration: '',
      description: '',
      dependencies: []
    };

    onUpdateStrategy(strategy.id, {
      timeline: {
        ...timeline,
        phases: [...phases, newPhase]
      }
    });
  };

  const handleUpdatePhase = (index: number, updates: Partial<TimelinePhase>) => {
    const updatedPhases = phases.map((phase, i) =>
      i === index ? { ...phase, ...updates } : phase
    );

    onUpdateStrategy(strategy.id, {
      timeline: {
        ...timeline,
        phases: updatedPhases
      }
    });
  };

  const handleRemovePhase = (index: number) => {
    const updatedPhases = phases.filter((_, i) => i !== index);
    onUpdateStrategy(strategy.id, {
      timeline: {
        ...timeline,
        phases: updatedPhases
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
          </div>
          <button
            onClick={handleAddPhase}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            <Plus className="w-4 h-4" />
            <span>Add Phase</span>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={strategy.status || 'Not Started'}
              onChange={(e) => handleStatusChange(e.target.value as any)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration
            </label>
            <input
              type="text"
              value={timeline.estimatedDuration}
              onChange={(e) => onUpdateStrategy(strategy.id, {
                timeline: { ...timeline, estimatedDuration: e.target.value }
              })}
              placeholder="e.g., 3 months"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Implementation Phases</h4>
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div key={phase.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phase Name
                      </label>
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => handleUpdatePhase(index, { name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Phase name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={phase.duration}
                        onChange={(e) => handleUpdatePhase(index, { duration: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., 2 weeks"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={phase.description}
                      onChange={(e) => handleUpdatePhase(index, { description: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      rows={2}
                      placeholder="Phase description"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemovePhase(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Step Timeline</h4>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">{step.description}</p>
                    <input
                      type="date"
                      value={step.dueDate || ''}
                      onChange={(e) => {
                        const updatedSteps = steps.map((s) =>
                          s.id === step.id ? { ...s, dueDate: e.target.value } : s
                        );
                        onUpdateStrategy(strategy.id, { customSteps: updatedSteps });
                      }}
                      className="mt-2 p-1 border rounded text-sm"
                    />
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    step.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {step.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
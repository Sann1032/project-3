import React, { useState } from 'react';
import { UserStrategy, TaxStep } from '../../types/strategy';
import { Users, UserPlus, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface StrategyTeamProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyTeam: React.FC<StrategyTeamProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });
  const steps = strategy.customSteps || strategy.steps || [];

  const handleAssignStep = (stepId: string, assignedTo: string) => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId ? { ...step, assignedTo } : step
    );
    onUpdateStrategy(strategy.id, { customSteps: updatedSteps });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Team & Assignments</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Step Assignments</h4>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">{step.description}</p>
                    <input
                      type="text"
                      value={step.assignedTo || ''}
                      onChange={(e) => handleAssignStep(step.id, e.target.value)}
                      placeholder="Assign to..."
                      className="mt-2 p-1 border rounded text-sm w-full"
                    />
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    step.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {step.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Team Notes</h4>
            <textarea
              value={strategy.customNotes || ''}
              onChange={(e) => onUpdateStrategy(strategy.id, { customNotes: e.target.value })}
              placeholder="Add team coordination notes..."
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          {strategy.timeline && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Timeline Overview</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Estimated Duration:</span> {strategy.timeline.estimatedDuration}
                </p>
                {strategy.timeline.phases && strategy.timeline.phases.length > 0 && (
                  <div className="space-y-2">
                    {strategy.timeline.phases.map((phase) => (
                      <div key={phase.id} className="text-sm">
                        <p className="font-medium text-gray-800">{phase.name}</p>
                        <p className="text-gray-600">{phase.description}</p>
                        <p className="text-gray-500 text-xs">Duration: {phase.duration}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
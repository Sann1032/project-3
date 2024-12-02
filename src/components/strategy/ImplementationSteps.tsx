import React, { useState } from 'react';
import { UserStrategy, TaxStep } from '../../types/strategy';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';

interface ImplementationStepsProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const ImplementationSteps: React.FC<ImplementationStepsProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const initialSteps = strategy.customSteps || strategy.steps || [];
  const [steps, setSteps] = useState<TaxStep[]>(initialSteps);
  const [newStep, setNewStep] = useState('');

  const handleSaveSteps = (updatedSteps: TaxStep[]) => {
    onUpdateStrategy(strategy.id, {
      customSteps: updatedSteps,
      lastModified: new Date(),
    });
  };

  const toggleStep = (stepId: string) => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    setSteps(updatedSteps);
    handleSaveSteps(updatedSteps);
  };

  const addStep = () => {
    if (!newStep.trim()) return;

    const newStepObj: TaxStep = {
      id: `custom-${Date.now()}`,
      description: newStep,
      completed: false,
    };

    const updatedSteps = [...steps, newStepObj];
    setSteps(updatedSteps);
    handleSaveSteps(updatedSteps);
    setNewStep('');
  };

  const removeStep = (stepId: string) => {
    const updatedSteps = steps.filter((step) => step.id !== stepId);
    setSteps(updatedSteps);
    handleSaveSteps(updatedSteps);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Steps</h3>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <button
                onClick={() => toggleStep(step.id)}
                className={`flex-shrink-0 w-5 h-5 border rounded ${
                  step.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}
              >
                {step.completed && <CheckSquare className="w-4 h-4 text-white" />}
              </button>
              <span className={`flex-grow ${step.completed ? 'line-through text-gray-500' : ''}`}>
                {step.description}
              </span>
              <button
                onClick={() => removeStep(step.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Add new step..."
            className="flex-grow p-2 border rounded-md"
            onKeyPress={(e) => e.key === 'Enter' && addStep()}
          />
          <button
            onClick={addStep}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
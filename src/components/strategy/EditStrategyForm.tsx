import React, { useState } from 'react';
import { UserStrategy, TaxStep } from '../../types/strategy';
import { Plus, Trash2, Save } from 'lucide-react';

interface EditStrategyFormProps {
  strategy: UserStrategy;
  onSubmit: (updates: Partial<UserStrategy>) => Promise<void>;
  onCancel: () => void;
}

export const EditStrategyForm: React.FC<EditStrategyFormProps> = ({
  strategy,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: strategy.name,
    description: strategy.description,
    estimatedSavings: strategy.estimatedSavings,
    steps: strategy.steps || [],
    implementationGuide: strategy.implementationGuide || '',
    requirements: strategy.requirements || [],
    risks: strategy.risks || [],
    overview: strategy.overview || {
      summary: '',
      benefits: [],
      applicability: [],
      taxImplications: []
    }
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error saving strategy:', error);
    } finally {
      setSaving(false);
    }
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: `step-${Date.now()}`,
          description: '',
          completed: false
        }
      ]
    }));
  };

  const updateStep = (index: number, updates: Partial<TaxStep>) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, ...updates } : step
      )
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900">Edit Strategy</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Strategy Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Savings</label>
          <input
            type="number"
            value={formData.estimatedSavings}
            onChange={(e) => setFormData({ ...formData, estimatedSavings: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Implementation Steps</label>
            <button
              type="button"
              onClick={addStep}
              className="text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {formData.steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => updateStep(index, { description: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Step description"
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Implementation Guide</label>
          <textarea
            value={formData.implementationGuide}
            onChange={(e) => setFormData({ ...formData, implementationGuide: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
};
import React, { useState } from 'react';
import { TaxStrategy } from '../../types/strategy';
import { Plus, Trash2 } from 'lucide-react';

interface CourseFormProps {
  course?: TaxStrategy | null;
  onSubmit: (data: Partial<TaxStrategy>) => Promise<void>;
  onCancel: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    description: course?.description || '',
    estimatedSavings: course?.estimatedSavings || 0,
    steps: course?.steps || [{ id: '1', description: '', completed: false }],
    implementationGuide: course?.implementationGuide || '',
    overview: course?.overview || {
      summary: '',
      benefits: [''],
      applicability: [''],
      taxImplications: ['']
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { id: Date.now().toString(), description: '', completed: false }]
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (field: 'benefits' | 'applicability' | 'taxImplications') => {
    setFormData(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: [...prev.overview[field], '']
      }
    }));
  };

  const removeArrayItem = (field: 'benefits' | 'applicability' | 'taxImplications', index: number) => {
    setFormData(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: prev.overview[field].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {course ? 'Edit Course' : 'Add New Course'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
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
                  onChange={(e) => {
                    const newSteps = [...formData.steps];
                    newSteps[index] = { ...step, description: e.target.value };
                    setFormData({ ...formData, steps: newSteps });
                  }}
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Overview Summary</label>
          <textarea
            value={formData.overview.summary}
            onChange={(e) => setFormData({
              ...formData,
              overview: { ...formData.overview, summary: e.target.value }
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic arrays (benefits, applicability, tax implications) */}
        {(['benefits', 'applicability', 'taxImplications'] as const).map(field => (
          <div key={field}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.overview[field].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...formData.overview[field]];
                      newItems[index] = e.target.value;
                      setFormData({
                        ...formData,
                        overview: { ...formData.overview, [field]: newItems }
                      });
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder={`Add ${field} item`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(field, index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
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
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {course ? 'Save Changes' : 'Create Course'}
        </button>
      </div>
    </form>
  );
};
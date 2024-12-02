import React, { useState } from 'react';
import { TaxStrategy, TimelinePhase, TrainingVideo, TrainingDocument, TrainingArticle } from '../../types/strategy';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface EditStrategyFormProps {
  strategy: TaxStrategy;
  onSave: (updates: Partial<TaxStrategy>) => void;
  onCancel: () => void;
}

export const EditStrategyForm: React.FC<EditStrategyFormProps> = ({
  strategy,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<TaxStrategy>>({
    name: strategy.name,
    description: strategy.description,
    estimatedSavings: strategy.estimatedSavings,
    steps: strategy.steps,
    implementationGuide: strategy.implementationGuide,
    requirements: strategy.requirements || [],
    risks: strategy.risks || [],
    timeline: strategy.timeline || {
      estimatedDuration: '',
      phases: []
    },
    trainingResources: strategy.trainingResources || {
      videos: [],
      documents: [],
      articles: []
    },
    overview: strategy.overview || {
      summary: '',
      benefits: [],
      applicability: [],
      taxImplications: []
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addArrayItem = (field: keyof TaxStrategy, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), value]
    }));
  };

  const removeArrayItem = (field: keyof TaxStrategy, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const addPhase = () => {
    const newPhase: TimelinePhase = {
      id: Date.now().toString(),
      name: '',
      duration: '',
      description: '',
      dependencies: []
    };

    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline!,
        phases: [...prev.timeline!.phases, newPhase]
      }
    }));
  };

  const updatePhase = (index: number, updates: Partial<TimelinePhase>) => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline!,
        phases: prev.timeline!.phases.map((phase, i) => 
          i === index ? { ...phase, ...updates } : phase
        )
      }
    }));
  };

  const addTrainingResource = (type: 'videos' | 'documents' | 'articles') => {
    const newResource = {
      id: Date.now().toString(),
      title: '',
      url: '',
      description: '',
      ...(type === 'videos' ? { duration: '' } :
         type === 'documents' ? { type: '' } :
         { author: '' })
    };

    setFormData(prev => ({
      ...prev,
      trainingResources: {
        ...prev.trainingResources!,
        [type]: [...(prev.trainingResources![type] || []), newResource]
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Savings</label>
          <input
            type="number"
            value={formData.estimatedSavings}
            onChange={(e) => setFormData({ ...formData, estimatedSavings: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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

        {/* Requirements Section */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Requirements</label>
            <button
              type="button"
              onClick={() => addArrayItem('requirements', '')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {formData.requirements?.map((req, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={req}
                onChange={(e) => {
                  const newReqs = [...formData.requirements!];
                  newReqs[index] = e.target.value;
                  setFormData({ ...formData, requirements: newReqs });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Timeline Phases</label>
            <button
              type="button"
              onClick={addPhase}
              className="text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {formData.timeline?.phases.map((phase, index) => (
            <div key={phase.id} className="mt-2 p-4 border rounded-md">
              <div className="space-y-2">
                <input
                  type="text"
                  value={phase.name}
                  onChange={(e) => updatePhase(index, { name: e.target.value })}
                  placeholder="Phase Name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={phase.duration}
                  onChange={(e) => updatePhase(index, { duration: e.target.value })}
                  placeholder="Duration"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  value={phase.description}
                  onChange={(e) => updatePhase(index, { description: e.target.value })}
                  placeholder="Description"
                  rows={2}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Training Resources Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Training Resources</h3>
          
          {/* Videos */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Videos</label>
              <button
                type="button"
                onClick={() => addTrainingResource('videos')}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.trainingResources?.videos?.map((video, index) => (
              <div key={video.id} className="mt-2 p-4 border rounded-md">
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => {
                    const newVideos = [...formData.trainingResources!.videos!];
                    newVideos[index] = { ...video, title: e.target.value };
                    setFormData({
                      ...formData,
                      trainingResources: {
                        ...formData.trainingResources!,
                        videos: newVideos
                      }
                    });
                  }}
                  placeholder="Video Title"
                  className="w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={video.url}
                  onChange={(e) => {
                    const newVideos = [...formData.trainingResources!.videos!];
                    newVideos[index] = { ...video, url: e.target.value };
                    setFormData({
                      ...formData,
                      trainingResources: {
                        ...formData.trainingResources!,
                        videos: newVideos
                      }
                    });
                  }}
                  placeholder="Video URL"
                  className="w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Documents</label>
              <button
                type="button"
                onClick={() => addTrainingResource('documents')}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.trainingResources?.documents?.map((doc, index) => (
              <div key={doc.id} className="mt-2 p-4 border rounded-md">
                <input
                  type="text"
                  value={doc.title}
                  onChange={(e) => {
                    const newDocs = [...formData.trainingResources!.documents!];
                    newDocs[index] = { ...doc, title: e.target.value };
                    setFormData({
                      ...formData,
                      trainingResources: {
                        ...formData.trainingResources!,
                        documents: newDocs
                      }
                    });
                  }}
                  placeholder="Document Title"
                  className="w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={doc.url}
                  onChange={(e) => {
                    const newDocs = [...formData.trainingResources!.documents!];
                    newDocs[index] = { ...doc, url: e.target.value };
                    setFormData({
                      ...formData,
                      trainingResources: {
                        ...formData.trainingResources!,
                        documents: newDocs
                      }
                    });
                  }}
                  placeholder="Document URL"
                  className="w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              value={formData.overview?.summary}
              onChange={(e) => setFormData({
                ...formData,
                overview: {
                  ...formData.overview!,
                  summary: e.target.value
                }
              })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Benefits</label>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    overview: {
                      ...formData.overview!,
                      benefits: [...formData.overview!.benefits, '']
                    }
                  });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.overview?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.overview!.benefits];
                    newBenefits[index] = e.target.value;
                    setFormData({
                      ...formData,
                      overview: {
                        ...formData.overview!,
                        benefits: newBenefits
                      }
                    });
                  }}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBenefits = formData.overview!.benefits.filter((_, i) => i !== index);
                    setFormData({
                      ...formData,
                      overview: {
                        ...formData.overview!,
                        benefits: newBenefits
                      }
                    });
                  }}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
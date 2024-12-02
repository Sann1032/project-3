import React, { useState } from 'react';
import { TaxStrategy, TimelinePhase, TrainingVideo, TrainingDocument, TrainingArticle } from '../../types/strategy';
import { X, Plus, Trash2 } from 'lucide-react';

interface CreateStrategyFormProps {
  onSubmit: (strategy: Omit<TaxStrategy, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export const CreateStrategyForm: React.FC<CreateStrategyFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    estimatedSavings: 0,
    steps: [{ description: '', completed: false }],
    implementationGuide: '',
    requirements: [''],
    risks: [''],
    timeline: {
      estimatedDuration: '',
      phases: [{ 
        id: '1',
        name: '',
        duration: '',
        description: '',
        dependencies: []
      }]
    },
    trainingResources: {
      videos: [{
        id: '1',
        title: '',
        url: '',
        duration: '',
        description: ''
      }],
      documents: [{
        id: '1',
        title: '',
        url: '',
        type: '',
        description: ''
      }],
      articles: [{
        id: '1',
        title: '',
        url: '',
        author: '',
        description: ''
      }]
    },
    overview: {
      summary: '',
      benefits: [''],
      applicability: [''],
      taxImplications: ['']
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      isActive: false,
      steps: formData.steps.map((step, index) => ({
        id: `step-${index + 1}`,
        ...step,
      })),
      dateCreated: new Date(),
      lastModified: new Date()
    });
    onCancel();
  };

  // Helper functions for array fields
  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

  // Helper functions for timeline phases
  const updatePhase = (index: number, updates: Partial<TimelinePhase>) => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        phases: prev.timeline.phases.map((phase, i) => 
          i === index ? { ...phase, ...updates } : phase
        )
      }
    }));
  };

  const addPhase = () => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        phases: [...prev.timeline.phases, {
          id: `${prev.timeline.phases.length + 1}`,
          name: '',
          duration: '',
          description: '',
          dependencies: []
        }]
      }
    }));
  };

  const removePhase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        phases: prev.timeline.phases.filter((_, i) => i !== index)
      }
    }));
  };

  // Helper functions for training resources
  const updateTrainingResource = (
    type: 'videos' | 'documents' | 'articles',
    index: number,
    updates: Partial<TrainingVideo | TrainingDocument | TrainingArticle>
  ) => {
    setFormData(prev => ({
      ...prev,
      trainingResources: {
        ...prev.trainingResources,
        [type]: prev.trainingResources[type].map((resource, i) =>
          i === index ? { ...resource, ...updates } : resource
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
        ...prev.trainingResources,
        [type]: [...prev.trainingResources[type], newResource]
      }
    }));
  };

  const removeTrainingResource = (type: 'videos' | 'documents' | 'articles', index: number) => {
    setFormData(prev => ({
      ...prev,
      trainingResources: {
        ...prev.trainingResources,
        [type]: prev.trainingResources[type].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Create New Strategy</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strategy Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Annual Savings
            </label>
            <input
              type="number"
              value={formData.estimatedSavings}
              onChange={(e) => setFormData({ ...formData, estimatedSavings: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Overview Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Strategy Overview</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <textarea
              value={formData.overview.summary}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                overview: { ...prev.overview, summary: e.target.value }
              }))}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Benefits</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: {
                    ...prev.overview,
                    benefits: [...prev.overview.benefits, '']
                  }
                }))}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.overview.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.overview.benefits];
                    newBenefits[index] = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, benefits: newBenefits }
                    }));
                  }}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Benefit"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBenefits = formData.overview.benefits.filter((_, i) => i !== index);
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, benefits: newBenefits }
                    }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Applicability */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Applicability</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: {
                    ...prev.overview,
                    applicability: [...prev.overview.applicability, '']
                  }
                }))}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.overview.applicability.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newApplicability = [...formData.overview.applicability];
                    newApplicability[index] = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, applicability: newApplicability }
                    }));
                  }}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Applicability criteria"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newApplicability = formData.overview.applicability.filter((_, i) => i !== index);
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, applicability: newApplicability }
                    }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Tax Implications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Tax Implications</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: {
                    ...prev.overview,
                    taxImplications: [...prev.overview.taxImplications, '']
                  }
                }))}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.overview.taxImplications.map((implication, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={implication}
                  onChange={(e) => {
                    const newImplications = [...formData.overview.taxImplications];
                    newImplications[index] = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, taxImplications: newImplications }
                    }));
                  }}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Tax implication"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImplications = formData.overview.taxImplications.filter((_, i) => i !== index);
                    setFormData(prev => ({
                      ...prev,
                      overview: { ...prev.overview, taxImplications: newImplications }
                    }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Implementation Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Implementation Guide
            </label>
            <textarea
              value={formData.implementationGuide}
              onChange={(e) => setFormData({ ...formData, implementationGuide: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          {/* Implementation Steps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Implementation Steps</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  steps: [...prev.steps, { description: '', completed: false }]
                }))}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => {
                    const newSteps = [...formData.steps];
                    newSteps[index] = { ...step, description: e.target.value };
                    setFormData(prev => ({ ...prev, steps: newSteps }));
                  }}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Step description"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSteps = formData.steps.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, steps: newSteps }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Requirement"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('requirements', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Risks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Risks</label>
              <button
                type="button"
                onClick={() => addArrayItem('risks')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.risks.map((risk, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={risk}
                  onChange={(e) => updateArrayField('risks', index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Risk"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('risks', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Duration
            </label>
            <input
              type="text"
              value={formData.timeline.estimatedDuration}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                timeline: { ...prev.timeline, estimatedDuration: e.target.value }
              }))}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., 3 months"
            />
          </div>

          {/* Timeline Phases */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Phases</label>
              <button
                type="button"
                onClick={addPhase}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.timeline.phases.map((phase, index) => (
              <div key={phase.id} className="border rounded-md p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phase Name
                    </label>
                    <input
                      type="text"
                      value={phase.name}
                      onChange={(e) => updatePhase(index, { name: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={phase.duration}
                      onChange={(e) => updatePhase(index, { duration: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={phase.description}
                    onChange={(e) => updatePhase(index, { description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhase(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Training Resources Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Training Resources</h3>
          
          {/* Videos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Training Videos</label>
              <button
                type="button"
                onClick={() => addTrainingResource('videos')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.trainingResources.videos.map((video, index) => (
              <div key={video.id} className="border rounded-md p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) => updateTrainingResource('videos', index, { title: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={video.duration}
                      onChange={(e) => updateTrainingResource('videos', index, { duration: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={video.url}
                    onChange={(e) => updateTrainingResource('videos', index, { url: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={video.description}
                    onChange={(e) => updateTrainingResource('videos', index, { description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTrainingResource('videos', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Training Documents</label>
              <button
                type="button"
                onClick={() => addTrainingResource('documents')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.trainingResources.documents.map((doc, index) => (
              <div key={doc.id} className="border rounded-md p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => updateTrainingResource('documents', index, { title: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={doc.type}
                      onChange={(e) => updateTrainingResource('documents', index, { type: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={doc.url}
                    onChange={(e) => updateTrainingResource('documents', index, { url: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={doc.description}
                    onChange={(e) => updateTrainingResource('documents', index, { description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTrainingResource('documents', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Reference Articles</label>
              <button
                type="button"
                onClick={() => addTrainingResource('articles')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.trainingResources.articles.map((article, index) => (
              <div key={article.id} className="border rounded-md p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) => updateTrainingResource('articles', index, { title: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={article.author}
                      onChange={(e) => updateTrainingResource('articles', index, { author: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={article.url}
                    onChange={(e) => updateTrainingResource('articles', index, { url: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={article.description}
                    onChange={(e) => updateTrainingResource('articles', index, { description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTrainingResource('articles', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Strategy
          </button>
        </div>
      </form>
    </div>
  );
};
import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entity: {
    name: string;
    type: 'active' | 'real estate' | 'retirement' | 'investment';
    description: string;
    revenue: number;
    hasRealEstate?: boolean;
    realEstateDetails?: {
      name: string;
      value: number;
      description: string;
    };
    trustOnly?: boolean;
  }) => void;
  calculateHoldingType: (nodes: any[]) => string;
}

export const AddEntityModal: React.FC<AddEntityModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd,
  calculateHoldingType 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'active',
    description: '',
    revenue: 0,
    hasRealEstate: false,
    realEstateDetails: {
      name: '',
      value: 0,
      description: ''
    },
    trustOnly: false
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only proceed to step 2 if it's an active business and has real estate
    if (formData.type === 'active' && formData.hasRealEstate && step === 1) {
      setStep(2);
      return;
    }

    onAdd({
      name: formData.name || 'New Entity',
      type: formData.type as 'active' | 'real estate' | 'retirement' | 'investment',
      description: formData.description || 'Description pending',
      revenue: formData.revenue,
      hasRealEstate: formData.hasRealEstate,
      realEstateDetails: formData.hasRealEstate ? formData.realEstateDetails : undefined,
      trustOnly: formData.trustOnly
    });
    
    // Reset form
    setFormData({
      name: '',
      type: 'active',
      description: '',
      revenue: 0,
      hasRealEstate: false,
      realEstateDetails: {
        name: '',
        value: 0,
        description: ''
      },
      trustOnly: false
    });
    setStep(1);
    onClose();
  };

  const handleBack = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === 1 ? 'Add New Entity' : 'Real Estate Details'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter entity name"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setFormData({ 
                      ...formData, 
                      type: newType,
                      // Reset hasRealEstate if type is not active
                      hasRealEstate: newType === 'active' ? formData.hasRealEstate : false
                    });
                  }}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="active">Active Business</option>
                  <option value="real estate">Real Estate Investment</option>
                  <option value="retirement">Retirement Account</option>
                  <option value="investment">Other Investment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Revenue/Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                    className="w-full pl-10 p-2 border rounded-md"
                  />
                </div>
              </div>

              {formData.type === 'active' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasRealEstate"
                    checked={formData.hasRealEstate}
                    onChange={(e) => setFormData({ ...formData, hasRealEstate: e.target.checked })}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="hasRealEstate" className="text-sm text-gray-700">
                    This business owns real estate
                  </label>
                </div>
              )}

              {formData.type === 'real estate' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ownership Structure
                  </label>
                  <select
                    value={formData.trustOnly.toString()}
                    onChange={(e) => setFormData({ ...formData, trustOnly: e.target.value === 'true' })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="false">LLC Holdings</option>
                    <option value="true">Direct Trust Ownership</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  value={formData.realEstateDetails.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    realEstateDetails: {
                      ...formData.realEstateDetails,
                      name: e.target.value
                    }
                  })}
                  placeholder="Enter property name"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={formData.realEstateDetails.value}
                    onChange={(e) => setFormData({
                      ...formData,
                      realEstateDetails: {
                        ...formData.realEstateDetails,
                        value: Number(e.target.value)
                      }
                    })}
                    className="w-full pl-10 p-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Description
                </label>
                <textarea
                  value={formData.realEstateDetails.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    realEstateDetails: {
                      ...formData.realEstateDetails,
                      description: e.target.value
                    }
                  })}
                  placeholder="Enter property description"
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {step === 1 && formData.type === 'active' && formData.hasRealEstate ? 'Next' : 'Add Entity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ClientInformation } from '../../types/client';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ClientInformation>) => Promise<void>;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    filingStatus: 'Single',
    annualIncome: '',
    employmentType: 'W2 Employee'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const clientData: Partial<ClientInformation> = {
      personalInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        filingStatus: formData.filingStatus as any,
        dependents: 0
      },
      financialInfo: {
        annualIncome: Number(formData.annualIncome) || 0,
        employmentType: formData.employmentType as any,
        hasBusinessIncome: false,
        hasInvestmentIncome: false,
        hasRentalIncome: false,
        retirementContributions: 0
      }
    };

    await onSubmit(clientData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add New Client</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
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
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filing Status
            </label>
            <select
              value={formData.filingStatus}
              onChange={(e) => setFormData({ ...formData, filingStatus: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="Single">Single</option>
              <option value="Married Filing Jointly">Married Filing Jointly</option>
              <option value="Married Filing Separately">Married Filing Separately</option>
              <option value="Head of Household">Head of Household</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Income
            </label>
            <input
              type="number"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="W2 Employee">W2 Employee</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Multiple Sources">Multiple Sources</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
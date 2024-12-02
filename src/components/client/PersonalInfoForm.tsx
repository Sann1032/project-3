import React from 'react';
import { PersonalInfo, FilingStatus } from '../../types/client';
import { User } from 'lucide-react';

interface PersonalInfoFormProps {
  info: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ info, onChange }) => {
  const filingStatuses: FilingStatus[] = [
    'Single',
    'Married Filing Jointly',
    'Married Filing Separately',
    'Head of Household',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => onChange({ ...info, name: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => onChange({ ...info, email: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => onChange({ ...info, phone: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing Status
          </label>
          <select
            value={info.filingStatus}
            onChange={(e) => onChange({ ...info, filingStatus: e.target.value as FilingStatus })}
            className="w-full p-2 border rounded-md"
          >
            {filingStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dependents
          </label>
          <input
            type="number"
            min="0"
            value={info.dependents}
            onChange={(e) => onChange({ ...info, dependents: parseInt(e.target.value) })}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
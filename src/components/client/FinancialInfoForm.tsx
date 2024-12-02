import React from 'react';
import { FinancialInfo, EmploymentType } from '../../types/client';
import { DollarSign } from 'lucide-react';
import { BusinessIncomeFields } from './financial/BusinessIncomeFields';
import { InvestmentIncomeFields } from './financial/InvestmentIncomeFields';
import { RentalIncomeFields } from './financial/RentalIncomeFields';

interface FinancialInfoFormProps {
  info: FinancialInfo;
  onChange: (info: FinancialInfo) => void;
}

export const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({ info, onChange }) => {
  const employmentTypes: EmploymentType[] = [
    'W2 Employee',
    'Self-Employed',
    'Business Owner',
    'Multiple Sources',
  ];

  const handleNumberChange = (field: keyof FinancialInfo, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onChange({
      ...info,
      [field]: isNaN(numValue) ? 0 : numValue
    });
  };

  const handleCheckboxChange = (field: keyof FinancialInfo) => {
    onChange({
      ...info,
      [field]: !info[field]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Financial Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              min="0"
              value={info.annualIncome || ''}
              onChange={(e) => handleNumberChange('annualIncome', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Type
          </label>
          <select
            value={info.employmentType}
            onChange={(e) => onChange({ ...info, employmentType: e.target.value as EmploymentType })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retirement Contributions
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              min="0"
              value={info.retirementContributions || ''}
              onChange={(e) => handleNumberChange('retirementContributions', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasBusinessIncome"
              checked={info.hasBusinessIncome}
              onChange={() => handleCheckboxChange('hasBusinessIncome')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasBusinessIncome" className="ml-2 text-sm text-gray-700">
              Business Income
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasInvestmentIncome"
              checked={info.hasInvestmentIncome}
              onChange={() => handleCheckboxChange('hasInvestmentIncome')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasInvestmentIncome" className="ml-2 text-sm text-gray-700">
              Investment Income
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasRentalIncome"
              checked={info.hasRentalIncome}
              onChange={() => handleCheckboxChange('hasRentalIncome')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasRentalIncome" className="ml-2 text-sm text-gray-700">
              Rental Income
            </label>
          </div>
        </div>
      </div>

      {/* Additional Fields Based on Income Types */}
      {info.hasBusinessIncome && (
        <BusinessIncomeFields
          info={info}
          onChange={onChange}
        />
      )}

      {info.hasInvestmentIncome && (
        <InvestmentIncomeFields
          info={info}
          onChange={onChange}
        />
      )}

      {info.hasRentalIncome && (
        <RentalIncomeFields
          info={info}
          onChange={onChange}
        />
      )}
    </div>
  );
};
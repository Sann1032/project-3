import React from 'react';
import { FinancialInfo } from '../../../types/client';
import { DollarSign, Building } from 'lucide-react';

interface RentalIncomeFieldsProps {
  info: FinancialInfo;
  onChange: (info: FinancialInfo) => void;
}

export const RentalIncomeFields: React.FC<RentalIncomeFieldsProps> = ({ info, onChange }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium">Rental Income Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Properties
          </label>
          <input
            type="number"
            value={info.numberOfProperties || ''}
            onChange={(e) => onChange({ ...info, numberOfProperties: Number(e.target.value) })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Rental Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.totalRentalIncome || ''}
              onChange={(e) => onChange({ ...info, totalRentalIncome: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Management Expenses
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.propertyExpenses || ''}
              onChange={(e) => onChange({ ...info, propertyExpenses: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Property Value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.totalPropertyValue || ''}
              onChange={(e) => onChange({ ...info, totalPropertyValue: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
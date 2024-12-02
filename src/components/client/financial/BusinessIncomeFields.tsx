import React from 'react';
import { FinancialInfo } from '../../../types/client';
import { DollarSign, Building2 } from 'lucide-react';

interface BusinessIncomeFieldsProps {
  info: FinancialInfo;
  onChange: (info: FinancialInfo) => void;
}

export const BusinessIncomeFields: React.FC<BusinessIncomeFieldsProps> = ({ info, onChange }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium">Business Income Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            value={info.businessType || 'LLC'}
            onChange={(e) => onChange({ ...info, businessType: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="LLC">LLC</option>
            <option value="S-Corporation">S-Corporation</option>
            <option value="C-Corporation">C-Corporation</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Business Revenue
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.businessRevenue || ''}
              onChange={(e) => onChange({ ...info, businessRevenue: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            value={info.numberOfEmployees || ''}
            onChange={(e) => onChange({ ...info, numberOfEmployees: Number(e.target.value) })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years in Business
          </label>
          <input
            type="number"
            value={info.yearsInBusiness || ''}
            onChange={(e) => onChange({ ...info, yearsInBusiness: Number(e.target.value) })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
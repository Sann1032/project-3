import React from 'react';
import { FinancialInfo } from '../../../types/client';
import { DollarSign, TrendingUp } from 'lucide-react';

interface InvestmentIncomeFieldsProps {
  info: FinancialInfo;
  onChange: (info: FinancialInfo) => void;
}

export const InvestmentIncomeFields: React.FC<InvestmentIncomeFieldsProps> = ({ info, onChange }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium">Investment Income Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dividend Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.dividendIncome || ''}
              onChange={(e) => onChange({ ...info, dividendIncome: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capital Gains
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.capitalGains || ''}
              onChange={(e) => onChange({ ...info, capitalGains: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.interestIncome || ''}
              onChange={(e) => onChange({ ...info, interestIncome: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Portfolio Value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={info.portfolioValue || ''}
              onChange={(e) => onChange({ ...info, portfolioValue: Number(e.target.value) })}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
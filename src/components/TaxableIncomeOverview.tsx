import React from 'react';
import { UserStrategy } from '../types/strategy';
import { DollarSign, TrendingDown, Calculator, PieChart } from 'lucide-react';
import { useClientInfo } from '../hooks/useClientInfo';

interface TaxableIncomeOverviewProps {
  strategies: UserStrategy[];
}

export const TaxableIncomeOverview: React.FC<TaxableIncomeOverviewProps> = ({ strategies }) => {
  const { clientInfo } = useClientInfo();
  const annualIncome = clientInfo.financialInfo?.annualIncome || 0;
  
  const activeStrategies = strategies.filter(s => s.isActive);
  const totalDeductions = activeStrategies.reduce(
    (sum, strategy) => sum + (strategy.targetSavings || strategy.estimatedSavings),
    0
  );

  const taxableIncome = Math.max(0, annualIncome - totalDeductions);

  // Calculate effective tax rate based on income brackets
  const calculateTaxRate = (income: number) => {
    if (income <= 11000) return 0.10;
    if (income <= 44725) return 0.12;
    if (income <= 95375) return 0.22;
    if (income <= 182100) return 0.24;
    if (income <= 231250) return 0.32;
    if (income <= 578125) return 0.35;
    return 0.37;
  };

  const effectiveTaxRate = calculateTaxRate(taxableIncome);
  const estimatedTaxSavings = totalDeductions * effectiveTaxRate;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-600">Annual Income</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${annualIncome.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">gross annual income</p>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-medium text-gray-600">Taxable Income</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${taxableIncome.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">after deductions</p>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-medium text-gray-600">Tax Savings</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${estimatedTaxSavings.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">at {(effectiveTaxRate * 100).toFixed(1)}% tax rate</p>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-600">Total Deductions</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-600">
            ${totalDeductions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">from {activeStrategies.length} strategies</p>
        </div>
      </div>
    </div>
  );
};
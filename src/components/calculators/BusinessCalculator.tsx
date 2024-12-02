import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Building2 } from 'lucide-react';

export const BusinessCalculator: React.FC = () => {
  const [values, setValues] = useState({
    initialInvestment: 100000,
    monthlyRevenue: 20000,
    monthlyExpenses: 15000,
    growthRate: 10,
    taxRate: 25,
    employeeCost: 5000,
    marketingBudget: 2000,
  });

  const calculateROI = () => {
    const annualRevenue = values.monthlyRevenue * 12;
    const annualExpenses = values.monthlyExpenses * 12;
    const annualEmployeeCost = values.employeeCost * 12;
    const annualMarketingCost = values.marketingBudget * 12;
    
    const totalExpenses = annualExpenses + annualEmployeeCost + annualMarketingCost;
    const profitBeforeTax = annualRevenue - totalExpenses;
    const tax = (profitBeforeTax * values.taxRate) / 100;
    const netProfit = profitBeforeTax - tax;
    
    return (netProfit / values.initialInvestment) * 100;
  };

  const calculateBreakeven = () => {
    const monthlyFixedCosts = values.monthlyExpenses + values.employeeCost + values.marketingBudget;
    const monthlyProfit = values.monthlyRevenue - monthlyFixedCosts;
    
    if (monthlyProfit <= 0) return Infinity;
    return values.initialInvestment / monthlyProfit;
  };

  const roi = calculateROI();
  const breakevenMonths = calculateBreakeven();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Business Investment Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Investment
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.initialInvestment}
                onChange={(e) => setValues({ ...values, initialInvestment: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Revenue
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.monthlyRevenue}
                onChange={(e) => setValues({ ...values, monthlyRevenue: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Expenses
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.monthlyExpenses}
                onChange={(e) => setValues({ ...values, monthlyExpenses: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Cost (Monthly)
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.employeeCost}
                onChange={(e) => setValues({ ...values, employeeCost: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marketing Budget (Monthly)
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.marketingBudget}
                onChange={(e) => setValues({ ...values, marketingBudget: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Growth Rate (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.growthRate}
                onChange={(e) => setValues({ ...values, growthRate: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Rate (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.taxRate}
                onChange={(e) => setValues({ ...values, taxRate: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Return on Investment (ROI)</p>
              <p className="text-xl font-bold text-green-600">
                {roi.toFixed(2)}%
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Breakeven Period</p>
              <p className="text-xl font-bold text-blue-600">
                {breakevenMonths === Infinity ? 'N/A' : `${Math.ceil(breakevenMonths)} months`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Monthly Net Profit</p>
              <p className="text-xl font-bold text-green-600">
                ${(values.monthlyRevenue - values.monthlyExpenses - values.employeeCost - values.marketingBudget).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Annual Net Profit (After Tax)</p>
              <p className="text-xl font-bold text-green-600">
                ${((values.monthlyRevenue - values.monthlyExpenses - values.employeeCost - values.marketingBudget) * 12 * (1 - values.taxRate / 100)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
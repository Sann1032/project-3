import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Bitcoin } from 'lucide-react';

export const CryptoCalculator: React.FC = () => {
  const [values, setValues] = useState({
    initialInvestment: 10000,
    monthlyInvestment: 1000,
    expectedReturn: 15,
    volatilityRisk: 25,
    investmentPeriod: 5,
    portfolioAllocation: 10,
  });

  const calculateProjectedValue = () => {
    const monthlyRate = values.expectedReturn / 100 / 12;
    const months = values.investmentPeriod * 12;
    
    let futureValue = values.initialInvestment;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + values.monthlyInvestment) * (1 + monthlyRate);
    }
    
    return futureValue;
  };

  const calculateRiskAdjustedReturn = () => {
    const projectedValue = calculateProjectedValue();
    const totalInvestment = values.initialInvestment + (values.monthlyInvestment * values.investmentPeriod * 12);
    const totalReturn = ((projectedValue - totalInvestment) / totalInvestment) * 100;
    return totalReturn / values.volatilityRisk;
  };

  const projectedValue = calculateProjectedValue();
  const riskAdjustedReturn = calculateRiskAdjustedReturn();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Bitcoin className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Cryptocurrency Investment Calculator</h2>
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
              Monthly Investment
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.monthlyInvestment}
                onChange={(e) => setValues({ ...values, monthlyInvestment: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.expectedReturn}
                onChange={(e) => setValues({ ...values, expectedReturn: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Volatility Risk (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.volatilityRisk}
                onChange={(e) => setValues({ ...values, volatilityRisk: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={values.investmentPeriod}
              onChange={(e) => setValues({ ...values, investmentPeriod: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Allocation (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.portfolioAllocation}
                onChange={(e) => setValues({ ...values, portfolioAllocation: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Projected Value</p>
              <p className="text-xl font-bold text-green-600">
                ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Risk-Adjusted Return Ratio</p>
              <p className="text-xl font-bold text-blue-600">
                {riskAdjustedReturn.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Total Investment</p>
              <p className="text-xl font-bold text-gray-900">
                ${(values.initialInvestment + (values.monthlyInvestment * values.investmentPeriod * 12)).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Portfolio Exposure</p>
              <p className="text-xl font-bold text-orange-600">
                {values.portfolioAllocation}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
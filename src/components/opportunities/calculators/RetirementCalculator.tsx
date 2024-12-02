import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Clock } from 'lucide-react';

export const RetirementCalculator: React.FC = () => {
  const [values, setValues] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2.5,
  });

  const calculateRetirement = () => {
    const years = values.retirementAge - values.currentAge;
    const monthlyRate = values.expectedReturn / 100 / 12;
    const months = years * 12;
    
    let futureValue = values.currentSavings;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + values.monthlyContribution) * (1 + monthlyRate);
    }
    
    return futureValue;
  };

  const futureValue = calculateRetirement();
  const inflationAdjusted = futureValue / Math.pow(1 + values.inflationRate / 100, values.retirementAge - values.currentAge);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Retirement Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Age
            </label>
            <input
              type="number"
              value={values.currentAge}
              onChange={(e) => setValues({ ...values, currentAge: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retirement Age
            </label>
            <input
              type="number"
              value={values.retirementAge}
              onChange={(e) => setValues({ ...values, retirementAge: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Savings
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.currentSavings}
                onChange={(e) => setValues({ ...values, currentSavings: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Contribution
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.monthlyContribution}
                onChange={(e) => setValues({ ...values, monthlyContribution: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Retirement Projection</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Years Until Retirement</p>
              <p className="text-xl font-bold text-gray-900">
                {values.retirementAge - values.currentAge} years
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Future Value (Nominal)</p>
              <p className="text-xl font-bold text-green-600">
                ${futureValue.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Future Value (Inflation Adjusted)</p>
              <p className="text-xl font-bold text-blue-600">
                ${inflationAdjusted.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Monthly Income (4% Rule)</p>
              <p className="text-xl font-bold text-green-600">
                ${(inflationAdjusted * 0.04 / 12).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
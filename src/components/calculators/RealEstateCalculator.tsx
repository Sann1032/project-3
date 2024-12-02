import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Building } from 'lucide-react';

export const RealEstateCalculator: React.FC = () => {
  const [values, setValues] = useState({
    purchasePrice: 500000,
    downPayment: 20,
    interestRate: 4.5,
    loanTerm: 30,
    monthlyRent: 3000,
    expenses: 500,
    appreciation: 3,
  });

  const calculateMortgage = () => {
    const principal = values.purchasePrice * (1 - values.downPayment / 100);
    const monthlyRate = values.interestRate / 100 / 12;
    const numberOfPayments = values.loanTerm * 12;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const monthlyMortgage = calculateMortgage();
  const monthlyIncome = values.monthlyRent - values.expenses - monthlyMortgage;
  const annualIncome = monthlyIncome * 12;
  const cashOnCash = (annualIncome / (values.purchasePrice * values.downPayment / 100)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Real Estate Investment Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Price
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.purchasePrice}
                onChange={(e) => setValues({ ...values, purchasePrice: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment %
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.downPayment}
                onChange={(e) => setValues({ ...values, downPayment: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate %
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.interestRate}
                onChange={(e) => setValues({ ...values, interestRate: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rent
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.monthlyRent}
                onChange={(e) => setValues({ ...values, monthlyRent: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Monthly Mortgage Payment</p>
              <p className="text-xl font-bold text-gray-900">
                ${monthlyMortgage.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Monthly Net Income</p>
              <p className="text-xl font-bold text-green-600">
                ${monthlyIncome.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Annual Net Income</p>
              <p className="text-xl font-bold text-green-600">
                ${annualIncome.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Cash on Cash Return</p>
              <p className="text-xl font-bold text-blue-600">
                {cashOnCash.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
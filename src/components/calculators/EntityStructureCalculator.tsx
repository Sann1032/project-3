import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Building } from 'lucide-react';

export const EntityStructureCalculator: React.FC = () => {
  const [values, setValues] = useState({
    annualRevenue: 500000,
    netIncome: 200000,
    employees: 5,
    ownerSalary: 120000,
    stateOfOperation: 'Delaware',
    industryType: 'Technology',
  });

  const calculateTaxLiability = () => {
    // Simplified tax calculation
    const corporateTaxRate = 0.21; // 21% federal corporate tax rate
    const passthrough = values.netIncome * 0.37; // Highest individual tax rate
    const corporate = values.netIncome * corporateTaxRate;
    
    return {
      soleProprietor: values.netIncome * 0.37,
      partnership: passthrough,
      sCorp: passthrough,
      cCorp: corporate + (values.ownerSalary * 0.37), // Double taxation
      llc: passthrough,
    };
  };

  const getRecommendedStructure = () => {
    if (values.annualRevenue > 5000000) return 'C Corporation';
    if (values.employees > 10) return 'S Corporation';
    if (values.netIncome < 100000) return 'Sole Proprietorship';
    return 'LLC';
  };

  const taxLiability = calculateTaxLiability();
  const recommendedStructure = getRecommendedStructure();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Entity Structure Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Revenue
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.annualRevenue}
                onChange={(e) => setValues({ ...values, annualRevenue: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Net Income
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.netIncome}
                onChange={(e) => setValues({ ...values, netIncome: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Employees
            </label>
            <input
              type="number"
              value={values.employees}
              onChange={(e) => setValues({ ...values, employees: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner's Salary
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.ownerSalary}
                onChange={(e) => setValues({ ...values, ownerSalary: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State of Operation
            </label>
            <select
              value={values.stateOfOperation}
              onChange={(e) => setValues({ ...values, stateOfOperation: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="Delaware">Delaware</option>
              <option value="Nevada">Nevada</option>
              <option value="Wyoming">Wyoming</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry Type
            </label>
            <select
              value={values.industryType}
              onChange={(e) => setValues({ ...values, industryType: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
              <option value="Service">Service</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Entity Analysis</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">Recommended Structure</p>
              <p className="text-xl font-bold text-blue-600">
                {recommendedStructure}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Based on revenue, employees, and industry
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Estimated Tax Liability</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sole Proprietor</span>
                  <span className="text-sm font-medium">${taxLiability.soleProprietor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">LLC</span>
                  <span className="text-sm font-medium">${taxLiability.llc.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">S Corporation</span>
                  <span className="text-sm font-medium">${taxLiability.sCorp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">C Corporation</span>
                  <span className="text-sm font-medium">${taxLiability.cCorp.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Key Considerations</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Liability protection needs</li>
                <li>Growth and investment plans</li>
                <li>Management flexibility</li>
                <li>Compliance requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
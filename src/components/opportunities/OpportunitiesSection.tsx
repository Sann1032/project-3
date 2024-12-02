import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { useStrategies } from '../../hooks/useStrategies';
import {
  RealEstateCalculator,
  RetirementCalculator,
  BusinessCalculator,
  CryptoCalculator,
  BondCalculator,
  EntityStructureCalculator
} from '../calculators';

export const OpportunitiesSection: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('real-estate');
  const { strategies } = useStrategies();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStrategies = strategies.filter((strategy) =>
    strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    strategy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculators = [
    { id: 'real-estate', label: 'Real Estate Investment', component: RealEstateCalculator },
    { id: 'retirement', label: 'Retirement Planning', component: RetirementCalculator },
    { id: 'business', label: 'Business Investment', component: BusinessCalculator },
    { id: 'crypto', label: 'Cryptocurrency', component: CryptoCalculator },
    { id: 'bonds', label: 'Bonds & Fixed Income', component: BondCalculator },
    { id: 'entity', label: 'Entity Structure', component: EntityStructureCalculator },
  ];

  const ActiveComponent = calculators.find(calc => calc.id === activeCalculator)?.component || RealEstateCalculator;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Target className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Investment Opportunities</h1>
      </div>

      <div className="flex space-x-6">
        <div className="w-64 space-y-2">
          {calculators.map(calc => (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeCalculator === calc.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {calc.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};
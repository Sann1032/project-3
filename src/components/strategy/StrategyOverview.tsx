import React from 'react';
import { UserStrategy } from '../../types/strategy';
import { DollarSign, Calendar, Activity } from 'lucide-react';

interface StrategyOverviewProps {
  strategy: UserStrategy;
}

export const StrategyOverview: React.FC<StrategyOverviewProps> = ({ strategy }) => {
  const steps = strategy.customSteps || strategy.steps || [];
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Target Savings</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${(strategy.targetSavings || strategy.estimatedSavings || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Implementation Date</h3>
          </div>
          <p className="mt-2 text-xl text-gray-900">
            {strategy.implementationDate
              ? new Date(strategy.implementationDate).toLocaleDateString()
              : 'Not set'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">Progress</h3>
          </div>
          <p className="mt-2 text-xl text-gray-900">
            {completedSteps} of {totalSteps} steps ({Math.round(progress)}%)
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
        <p className="text-gray-600">{strategy.description}</p>
      </div>

      {strategy.overview && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Summary</h4>
              <p className="text-gray-600">{strategy.overview.summary}</p>
            </div>

            {strategy.overview.benefits && strategy.overview.benefits.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Benefits</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {strategy.overview.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.overview.applicability && strategy.overview.applicability.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Applicability</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {strategy.overview.applicability.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.overview.taxImplications && strategy.overview.taxImplications.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Tax Implications</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {strategy.overview.taxImplications.map((implication, index) => (
                    <li key={index}>{implication}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {strategy.implementationGuide && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Guide</h3>
          <p className="text-gray-600">{strategy.implementationGuide}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
        <p className="text-gray-600">{strategy.customNotes || 'No notes added yet.'}</p>
      </div>
    </div>
  );
};
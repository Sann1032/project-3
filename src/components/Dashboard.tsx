import React, { useState } from 'react';
import { ClientInfoSection } from './client/ClientInfoSection';
import { BuildPlanSection } from './BuildPlanSection';
import { StrategyList } from './strategy/StrategyList';
import { TaxableIncomeOverview } from './TaxableIncomeOverview';
import { useStrategies } from '../hooks/useStrategies';
import { useClientInfo } from '../hooks/useClientInfo';
import { Calculator, ClipboardList, ClipboardCheck, MessageSquare } from 'lucide-react';
import { AutoSave } from './AutoSave';
import { AIChat } from './ai/AIChat';
import { ClientSelector } from './firm/ClientSelector';
import { useAuth } from '../hooks/useAuth';
import { ClientInformation } from '../types/client';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { strategies, toggleStrategy, updateStrategyNotes, updateStrategy } = useStrategies();
  const { clientInfo, updateClientInfo } = useClientInfo();
  const [activeTab, setActiveTab] = useState<'info' | 'build' | 'strategies' | 'chat'>('info');
  const [selectedClient, setSelectedClient] = useState<ClientInformation | null>(null);

  const isFirmUser = user?.role === 'firm';
  const selectedStrategies = strategies.filter(s => s.isActive);
  const totalSavings = selectedStrategies.reduce((sum, strategy) => 
    sum + (strategy.targetSavings || strategy.estimatedSavings), 0);

  const handleSaveAll = async () => {
    const savePromises = selectedStrategies.map(strategy => 
      updateStrategy(strategy.id, strategy)
    );
    
    if (clientInfo) {
      savePromises.push(updateClientInfo(clientInfo));
    }

    await Promise.all(savePromises);
  };

  const handleClientSelect = (client: ClientInformation) => {
    setSelectedClient(client);
    // Update context or state to work with selected client's data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20 md:pt-8">
        {isFirmUser && (
          <div className="mb-6">
            <ClientSelector
              selectedClient={selectedClient}
              onClientSelect={handleClientSelect}
            />
          </div>
        )}

        <div className="flex items-center space-x-4 mb-8">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tax Planning Dashboard</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Estimated Annual Savings
              </h2>
              <p className="text-sm text-gray-600">
                Based on your active strategies
              </p>
            </div>
            <div className="text-xl md:text-2xl font-bold text-green-600">
              ${totalSavings.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'info'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>1. Client Information</span>
          </button>
          <button
            onClick={() => setActiveTab('build')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'build'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ClipboardCheck className="w-5 h-5" />
            <span>2. Build Plan</span>
          </button>
          <button
            onClick={() => setActiveTab('strategies')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'strategies'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span>3. Review Strategies</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </div>

        {activeTab === 'info' ? (
          <ClientInfoSection />
        ) : activeTab === 'build' ? (
          <BuildPlanSection />
        ) : activeTab === 'chat' ? (
          <AIChat />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Review Your Strategies</h2>
            </div>
            <TaxableIncomeOverview strategies={strategies} />
            <StrategyList
              strategies={strategies}
              onToggleStrategy={toggleStrategy}
              onUpdateNotes={updateStrategyNotes}
              onUpdateStrategy={updateStrategy}
            />
          </div>
        )}
      </div>
      <AutoSave onSave={handleSaveAll} saveInterval={30000} />
    </div>
  );
};
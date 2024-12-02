import React, { useState } from 'react';
import { UserStrategy } from '../types/strategy';
import { StrategyTabs } from './strategy/StrategyTabs';
import { StrategyOverview } from './strategy/StrategyOverview';
import { ImplementationSteps } from './strategy/ImplementationSteps';
import { StrategyTimeline } from './strategy/StrategyTimeline';
import { StrategyTeam } from './strategy/StrategyTeam';
import { StrategyDocuments } from './strategy/StrategyDocuments';
import { StrategySettings } from './strategy/StrategySettings';
import { StrategyResources } from './strategy/StrategyResources';

interface StrategyDetailsProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyDetails: React.FC<StrategyDetailsProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StrategyOverview strategy={strategy} />;
      case 'training':
        return <StrategyResources strategy={strategy} />;
      case 'implementation':
        return (
          <ImplementationSteps
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      case 'timeline':
        return (
          <StrategyTimeline
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      case 'team':
        return (
          <StrategyTeam
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      case 'documents':
        return (
          <StrategyDocuments
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      case 'settings':
        return (
          <StrategySettings
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      default:
        return <StrategyOverview strategy={strategy} />;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <StrategyTabs
          strategy={strategy}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <div className="col-span-9">
        {renderTabContent()}
      </div>
    </div>
  );
};
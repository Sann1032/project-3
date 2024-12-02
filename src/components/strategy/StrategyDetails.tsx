import React, { useState } from 'react';
import { UserStrategy } from '../../types/strategy';
import { StrategyTabs } from './StrategyTabs';
import { StrategyOverview } from './StrategyOverview';
import { ImplementationSteps } from './ImplementationSteps';
import { StrategyTimeline } from './StrategyTimeline';
import { StrategyTeam } from './StrategyTeam';
import { StrategyDocuments } from './StrategyDocuments';
import { StrategySettings } from './StrategySettings';
import { StrategyResources } from './StrategyResources';
import { useAuth } from '../../hooks/useAuth';

interface StrategyDetailsProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyDetails: React.FC<StrategyDetailsProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StrategyOverview strategy={strategy} />;
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
      case 'settings':
        return (
          <StrategySettings
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        );
      // Hidden features (only accessible to admin)
      case 'training':
        return isAdmin ? <StrategyResources strategy={strategy} /> : null;
      case 'team':
        return isAdmin ? (
          <StrategyTeam
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        ) : null;
      case 'documents':
        return isAdmin ? (
          <StrategyDocuments
            strategy={strategy}
            onUpdateStrategy={onUpdateStrategy}
          />
        ) : null;
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
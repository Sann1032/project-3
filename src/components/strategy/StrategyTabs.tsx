import React from 'react';
import { UserStrategy } from '../../types/strategy';
import { 
  BarChart3, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Settings,
  Users,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface StrategyTabsProps {
  strategy: UserStrategy;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const StrategyTabs: React.FC<StrategyTabsProps> = ({
  strategy,
  activeTab,
  onTabChange,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, enabled: true },
    { id: 'implementation', label: 'Implementation', icon: CheckSquare, enabled: true },
    { id: 'timeline', label: 'Timeline', icon: Calendar, enabled: true },
    { id: 'settings', label: 'Settings', icon: Settings, enabled: true },
    // Hidden/Disabled tabs (only visible to admin)
    { id: 'training', label: 'Training', icon: BookOpen, enabled: false },
    { id: 'team', label: 'Team', icon: Users, enabled: false },
    { id: 'documents', label: 'Documents', icon: FileText, enabled: false }
  ];

  // Filter tabs based on user role and enabled status
  const visibleTabs = isAdmin 
    ? tabs 
    : tabs.filter(tab => tab.enabled);

  return (
    <div className="flex flex-col space-y-2">
      {visibleTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            disabled={!tab.enabled}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600'
                : tab.enabled
                ? 'text-gray-600 hover:bg-gray-50'
                : 'text-gray-400 cursor-not-allowed bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
            {!tab.enabled && isAdmin && (
              <span className="ml-auto text-xs text-gray-400">(Coming Soon)</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
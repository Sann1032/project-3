import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CoursesSection } from './components/courses/CoursesSection';
import { OpportunitiesSection } from './components/opportunities/OpportunitiesSection';
import { DatabaseStrategies } from './components/DatabaseStrategies';
import { AuthPage } from './components/auth/AuthPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { EmailVerification } from './components/auth/EmailVerification';
import { AdminPage } from './components/admin/AdminPage';
import { EntityEstatePlanning } from './components/estate/EntityEstatePlanning';
import { ClientManagement } from './components/firm/ClientManagement';
import { useAuth } from './hooks/useAuth';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';
  const isFirmUser = user?.role === 'firm';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <AuthPage />
      </ErrorBoundary>
    );
  }

  if (!user.emailVerified) {
    return (
      <ErrorBoundary>
        <EmailVerification email={user.email || ''} />
      </ErrorBoundary>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return isFirmUser ? <ClientManagement /> : <Dashboard />;
      case 'courses':
        return <CoursesSection />;
      case 'opportunities':
        return <OpportunitiesSection />;
      case 'estate':
        return <EntityEstatePlanning />;
      case 'database':
        return isAdmin ? <DatabaseStrategies /> : <Dashboard />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return isAdmin ? <AdminPage /> : <Dashboard />;
      case 'next-steps':
        return <div className="p-8">Next Steps content coming soon...</div>;
      case 'tax-planning':
        return <div className="p-8">Tax Planning content coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row min-h-screen">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 bg-gray-50">
          <ErrorBoundary>
            {renderContent()}
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
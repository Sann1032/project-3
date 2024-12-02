import React, { useState } from 'react';
import { Shield, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AdminStrategyList } from './AdminStrategyList';
import { CreateStrategyForm } from './CreateStrategyForm';
import { useAdminStrategies } from '../../hooks/useAdminStrategies';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { strategies, createStrategy, updateStrategy, deleteStrategy, loading, error } = useAdminStrategies();

  // Admin email check
  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Strategy</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showCreateForm && (
        <CreateStrategyForm
          onSubmit={createStrategy}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <AdminStrategyList
        strategies={strategies}
        onUpdate={updateStrategy}
        onDelete={deleteStrategy}
      />
    </div>
  );
};
import React from 'react';
import { Users, UserPlus, Search } from 'lucide-react';
import { ClientInformation } from '../../types/client';
import { useClientList } from '../../hooks/useClientList';

export const ClientList: React.FC = () => {
  const { 
    clients, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm,
    selectedClient,
    setSelectedClient,
    handleAddClient 
  } = useClientList();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Client Management</h2>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedClient?.id === client.id
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedClient(client)}
          >
            <h3 className="font-medium text-gray-900">{client.personalInfo.name}</h3>
            <p className="text-sm text-gray-500">{client.personalInfo.email}</p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {client.personalInfo.filingStatus}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                ${client.financialInfo.annualIncome.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
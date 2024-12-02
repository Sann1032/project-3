import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { useClientList } from '../../hooks/useClientList';
import { ClientInformation } from '../../types/client';

interface ClientSelectorProps {
  selectedClient: ClientInformation | null;
  onClientSelect: (client: ClientInformation) => void;
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({
  selectedClient,
  onClientSelect
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { clients, loading, error } = useClientList();

  if (loading) {
    return (
      <div className="animate-pulse flex items-center space-x-4 p-2">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm p-2">
        Error loading clients: {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 w-full"
      >
        <Users className="w-5 h-5 text-gray-400" />
        <span className="flex-1 text-left">
          {selectedClient ? selectedClient.personalInfo.name : 'Select Client'}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {clients.map((client) => (
            <button
              key={client.personalInfo.email}
              onClick={() => {
                onClientSelect(client);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 ${
                selectedClient?.personalInfo.email === client.personalInfo.email
                  ? 'bg-blue-50'
                  : ''
              }`}
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{client.personalInfo.name}</p>
                <p className="text-sm text-gray-500">{client.personalInfo.email}</p>
              </div>
              {selectedClient?.personalInfo.email === client.personalInfo.email && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
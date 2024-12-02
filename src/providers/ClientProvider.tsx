import React, { useState } from 'react';
import { ClientContext } from '../hooks/useClientContext';
import { ClientInformation } from '../types/client';

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentClient, setCurrentClient] = useState<ClientInformation | null>(null);

  return (
    <ClientContext.Provider value={{ currentClient, setCurrentClient }}>
      {children}
    </ClientContext.Provider>
  );
};
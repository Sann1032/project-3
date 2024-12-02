import { createContext, useContext } from 'react';
import { ClientInformation } from '../types/client';

interface ClientContextType {
  currentClient: ClientInformation | null;
  setCurrentClient: (client: ClientInformation | null) => void;
}

export const ClientContext = createContext<ClientContextType>({
  currentClient: null,
  setCurrentClient: () => {}
});

export const useClientContext = () => useContext(ClientContext);
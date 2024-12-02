import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './config/firebase';
import { ClientProvider } from './providers/ClientProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientProvider>
      <App />
    </ClientProvider>
  </StrictMode>
);
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NetworkProvider } from './context/NetworkContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NetworkProvider>
        <App />
      </NetworkProvider>
    </AuthProvider>
  </React.StrictMode>,
);

import { createContext, useContext, type ReactNode } from 'react';
import useNetwork from '../hooks/useNetwork';

type NetworkContextType = { isOnline: boolean; connectionType: string };

const NetworkContext = createContext<NetworkContextType>({ isOnline: true, connectionType: 'unknown' });

export function NetworkProvider({ children }: { children: ReactNode }) {
  const { isOnline, connectionType } = useNetwork();
  return <NetworkContext.Provider value={{ isOnline, connectionType }}>{children}</NetworkContext.Provider>;
}

export function useNetworkContext() {
  return useContext(NetworkContext);
}

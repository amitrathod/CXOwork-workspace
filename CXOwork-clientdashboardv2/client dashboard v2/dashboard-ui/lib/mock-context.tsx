"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_CLIENT, type MockClient } from "./mock-data";

interface ClientContextValue {
  uid: string;
  client: MockClient;
  loading: boolean;
  refresh: () => Promise<void>;
  updateClientData: (updates: Partial<MockClient>) => void;
}

const ClientContext = createContext<ClientContextValue | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<MockClient>(INITIAL_CLIENT);

  const updateClientData = useCallback((updates: Partial<MockClient>) => {
    setClient(prev => {
      if (updates.preferences) {
        return { ...prev, ...updates, preferences: { ...prev.preferences, ...updates.preferences } };
      }
      return { ...prev, ...updates };
    });
  }, []);

  return (
    <ClientContext.Provider value={{ uid: client.uid, client, loading: false, refresh: async () => {}, updateClientData }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error("useClient must be inside ClientProvider");
  return ctx;
}

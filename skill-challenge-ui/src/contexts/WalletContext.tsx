import React, { createContext, useContext, useState } from 'react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

interface WalletContextType {
  connected: boolean;
  account: any;
  network: Network;
  aptosClient: Aptos;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptosClient = new Aptos(aptosConfig);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<any>(null);

  const connect = async () => {
    // Implement your wallet connection logic (optional override)
    setConnected(true);
    setAccount({ address: '0x123...' }); // Simulated
  };

  const disconnect = async () => {
    setConnected(false);
    setAccount(null);
  };

  const value = {
    connected,
    account,
    network: Network.TESTNET,
    aptosClient,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      <AptosWalletAdapterProvider autoConnect={true}>
        {children}
      </AptosWalletAdapterProvider>
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

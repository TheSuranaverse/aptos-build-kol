import React, { createContext, useContext, useState, useEffect } from 'react';
import { AptosWalletAdapterProvider, useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
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

const wallets = [new PetraWallet()];

const WalletProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connected, account, connect: aptosConnect, disconnect: aptosDisconnect } = useAptosWallet();

  const connect = async () => {
    try {
      await aptosConnect('Petra' as any);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const disconnect = async () => {
    try {
      await aptosDisconnect();
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
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
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider wallets={wallets} autoConnect={true}>
      <WalletProviderInner>
        {children}
      </WalletProviderInner>
    </AptosWalletAdapterProvider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
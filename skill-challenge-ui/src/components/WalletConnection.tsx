import React from 'react';
import { Wallet, Power, User } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { motion } from 'framer-motion';

const WalletConnection: React.FC = () => {
  const { connected, account, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  if (connected && account) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-medium">
            {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="flex items-center space-x-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-full transition-colors"
        >
          <Power className="w-4 h-4" />
          <span className="text-sm">Disconnect</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleConnect}
      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
    >
      <Wallet className="w-5 h-5" />
      <span>Connect Wallet</span>
    </motion.button>
  );
};

export default WalletConnection;
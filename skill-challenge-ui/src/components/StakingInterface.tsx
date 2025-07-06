import React, { useState } from 'react';
import { TrendingUp, User, Coins, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const StakingInterface: React.FC = () => {
  const { connected, account } = useWallet();
  const [targetAddress, setTargetAddress] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!targetAddress.trim()) {
      toast.error('Please enter a target address');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid stake amount');
      return;
    }

    setIsStaking(true);
    
    try {
      // Here you would call the stake_to_user function from your Move contract
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Successfully staked ${stakeAmount} APT!`);
      setTargetAddress('');
      setStakeAmount('');
    } catch (error) {
      toast.error('Failed to stake tokens');
      console.error('Staking error:', error);
    } finally {
      setIsStaking(false);
    }
  };

  const popularStakers = [
    { address: '0x1234...5678', skills: ['Smart Contracts', 'DeFi'], reputation: 95 },
    { address: '0x9876...5432', skills: ['Frontend', 'React'], reputation: 87 },
    { address: '0x5555...1111', skills: ['Backend', 'Node.js'], reputation: 92 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Stake & Support</h2>
          <p className="text-white/70">Support skilled developers by staking APT tokens</p>
        </div>
      </div>

      <form onSubmit={handleStake} className="space-y-6 mb-8">
        <div>
          <label htmlFor="targetAddress" className="block text-white font-medium mb-2">
            Target Address
          </label>
          <input
            type="text"
            id="targetAddress"
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
            placeholder="0x1234567890abcdef..."
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
            disabled={isStaking}
          />
        </div>

        <div>
          <label htmlFor="stakeAmount" className="block text-white font-medium mb-2">
            Stake Amount (APT)
          </label>
          <div className="relative">
            <input
              type="number"
              id="stakeAmount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
              disabled={isStaking}
            />
            <div className="absolute right-3 top-3 flex items-center space-x-1">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white/70 font-medium">APT</span>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!connected || isStaking}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-lg font-medium transition-all ${
            connected && !isStaking
              ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isStaking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Staking...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <ArrowUpRight className="w-5 h-5" />
              <span>Stake APT Tokens</span>
            </div>
          )}
        </motion.button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Popular Developers</h3>
        <div className="space-y-3">
          {popularStakers.map((staker, index) => (
            <motion.div
              key={staker.address}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              onClick={() => setTargetAddress(staker.address)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{staker.address}</p>
                  <p className="text-white/60 text-sm">{staker.skills.join(', ')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{staker.reputation}%</div>
                <div className="text-white/60 text-sm">Reputation</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StakingInterface;
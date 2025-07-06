import React, { useState } from 'react';
import { Zap, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const ChallengeSystem: React.FC = () => {
  const { connected, account } = useWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'pending' | 'resolve'>('create');
  const [targetAddress, setTargetAddress] = useState('');
  const [challengeStake, setChallengeStake] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!targetAddress.trim()) {
      toast.error('Please enter a target address');
      return;
    }

    if (!challengeStake || parseFloat(challengeStake) <= 0) {
      toast.error('Please enter a valid stake amount');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Here you would call the raise_challenge function from your Move contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Challenge created successfully!');
      setTargetAddress('');
      setChallengeStake('');
    } catch (error) {
      toast.error('Failed to create challenge');
      console.error('Challenge error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResolveChallenge = async (challengeId: string, passed: boolean) => {
    if (!connected || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Here you would call the resolve_challenge function from your Move contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Challenge ${passed ? 'passed' : 'failed'} successfully!`);
    } catch (error) {
      toast.error('Failed to resolve challenge');
      console.error('Resolve error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingChallenges = [
    { id: '1', target: '0x1234...5678', challenger: '0x9876...5432', stake: '5.0', timestamp: Date.now() - 3600000 },
    { id: '2', target: '0x5555...1111', challenger: '0x3333...7777', stake: '3.5', timestamp: Date.now() - 7200000 },
  ];

  const resolveChallenges = [
    { id: '3', target: account?.address || '', challenger: '0x1111...2222', stake: '2.0', timestamp: Date.now() - 1800000 },
  ];

  const tabs = [
    { id: 'create', label: 'Create Challenge', icon: Zap },
    { id: 'pending', label: 'Pending Challenges', icon: Clock },
    { id: 'resolve', label: 'Resolve Challenges', icon: Shield },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Challenge System</h2>
          <p className="text-white/70">Challenge and verify skill claims</p>
        </div>
      </div>

      <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === id
                ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'create' && (
        <form onSubmit={handleCreateChallenge} className="space-y-6">
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
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
              disabled={isProcessing}
            />
          </div>

          <div>
            <label htmlFor="challengeStake" className="block text-white font-medium mb-2">
              Challenge Stake (APT)
            </label>
            <input
              type="number"
              id="challengeStake"
              value={challengeStake}
              onChange={(e) => setChallengeStake(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
              disabled={isProcessing}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!connected || isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-lg font-medium transition-all ${
              connected && !isProcessing
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Challenge...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Create Challenge</span>
              </div>
            )}
          </motion.button>
        </form>
      )}

      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingChallenges.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No pending challenges</p>
            </div>
          ) : (
            pendingChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Challenge #{challenge.id}</span>
                  <span className="text-orange-400 font-semibold">{challenge.stake} APT</span>
                </div>
                <div className="text-white/70 text-sm space-y-1">
                  <p>Target: {challenge.target}</p>
                  <p>Challenger: {challenge.challenger}</p>
                  <p>Created: {new Date(challenge.timestamp).toLocaleString()}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {activeTab === 'resolve' && (
        <div className="space-y-4">
          {resolveChallenges.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No challenges to resolve</p>
            </div>
          ) : (
            resolveChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Challenge #{challenge.id}</span>
                  <span className="text-orange-400 font-semibold">{challenge.stake} APT</span>
                </div>
                <div className="text-white/70 text-sm space-y-1 mb-4">
                  <p>Challenger: {challenge.challenger}</p>
                  <p>Created: {new Date(challenge.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleResolveChallenge(challenge.id, true)}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Pass</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleResolveChallenge(challenge.id, false)}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Fail</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ChallengeSystem;
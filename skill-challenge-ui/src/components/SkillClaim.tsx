import React, { useState } from 'react';
import { Award, Star, Calendar, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const SkillClaim: React.FC = () => {
  const { connected, account } = useWallet();
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!skillName.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would call the mint_skill function from your Move contract
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Skill NFT minted successfully!');
      setSkillName('');
      setSkillLevel('Beginner');
    } catch (error) {
      toast.error('Failed to mint skill NFT');
      console.error('Mint error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillLevels = [
    { value: 'Beginner', color: 'from-green-400 to-green-600', icon: '🌱' },
    { value: 'Intermediate', color: 'from-yellow-400 to-orange-500', icon: '🔥' },
    { value: 'Advanced', color: 'from-purple-500 to-pink-600', icon: '👑' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Claim Your Skill</h2>
          <p className="text-white/70">Mint a skill NFT to showcase your expertise</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="skillName" className="block text-white font-medium mb-2">
            Skill Name
          </label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g., Smart Contract Development"
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Skill Level</label>
          <div className="grid grid-cols-3 gap-3">
            {skillLevels.map(({ value, color, icon }) => (
              <motion.button
                key={value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSkillLevel(value as any)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  skillLevel === value
                    ? 'border-white/50 bg-white/10'
                    : 'border-white/20 hover:border-white/30'
                }`}
                disabled={isSubmitting}
              >
                <div className={`w-full h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center text-2xl mb-2`}>
                  {icon}
                </div>
                <span className="text-white font-medium">{value}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!connected || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-lg font-medium transition-all ${
            connected && !isSubmitting
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Minting Skill NFT...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Mint Skill NFT</span>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SkillClaim;
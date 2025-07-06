import React from 'react';
import { Trophy, Target, Shield, Star, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';

const ReputationDashboard: React.FC = () => {
  const { connected, account } = useWallet();

  const reputationStats = {
    score: 87,
    verified_count: 12,
    challenged_survived: 8,
    total_stakes: 156.5,
    skills_claimed: 15,
    challenges_created: 3,
  };

  const recentActivities = [
    { type: 'skill_verified', description: 'Smart Contract Development skill verified', timestamp: Date.now() - 3600000 },
    { type: 'challenge_passed', description: 'Successfully passed React.js challenge', timestamp: Date.now() - 7200000 },
    { type: 'stake_received', description: 'Received 5.2 APT stake from supporter', timestamp: Date.now() - 10800000 },
    { type: 'skill_claimed', description: 'Claimed new skill: Web3 Integration', timestamp: Date.now() - 14400000 },
  ];

  const skillPortfolio = [
    { name: 'Smart Contract Development', level: 'Advanced', stakes: 45.2, challenges: 3 },
    { name: 'React.js', level: 'Intermediate', stakes: 32.1, challenges: 2 },
    { name: 'Node.js', level: 'Advanced', stakes: 28.5, challenges: 1 },
    { name: 'Web3 Integration', level: 'Beginner', stakes: 15.8, challenges: 0 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'skill_verified': return <Award className="w-4 h-4 text-green-400" />;
      case 'challenge_passed': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'stake_received': return <TrendingUp className="w-4 h-4 text-yellow-400" />;
      case 'skill_claimed': return <Star className="w-4 h-4 text-purple-400" />;
      default: return <Trophy className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'from-green-400 to-green-600';
      case 'Intermediate': return 'from-yellow-400 to-orange-500';
      case 'Advanced': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!connected || !account) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl text-center"
      >
        <Trophy className="w-16 h-16 mx-auto mb-4 text-white/50" />
        <h2 className="text-2xl font-bold text-white mb-2">Reputation Dashboard</h2>
        <p className="text-white/70">Connect your wallet to view your reputation and activity</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{reputationStats.score}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Reputation Score</h3>
          <p className="text-white/70 text-sm">Based on verified skills and challenges</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{reputationStats.verified_count}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Verified Skills</h3>
          <p className="text-white/70 text-sm">Successfully verified through challenges</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{reputationStats.total_stakes}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Total Stakes (APT)</h3>
          <p className="text-white/70 text-sm">Received from supporters</p>
        </motion.div>
      </div>

      {/* Skills Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
      >
        <h3 className="text-xl font-bold text-white mb-4">Skills Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillPortfolio.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{skill.name}</h4>
                <div className={`px-2 py-1 bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full text-white text-xs font-medium`}>
                  {skill.level}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>{skill.stakes} APT staked</span>
                <span>{skill.challenges} challenges</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.description}</p>
                <p className="text-white/50 text-xs">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReputationDashboard;
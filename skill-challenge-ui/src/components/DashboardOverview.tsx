import React from 'react';
import { Users, Award, TrendingUp, Zap, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardOverview: React.FC = () => {
  const protocolStats = {
    totalUsers: 1247,
    totalSkills: 3892,
    totalStakes: 12847.5,
    activeChallenges: 23,
    verifiedSkills: 2967,
    averageReputation: 78.5,
  };

  const trendingSkills = [
    { name: 'Smart Contract Development', claims: 156, stakes: 2340.5 },
    { name: 'React.js', claims: 203, stakes: 1876.2 },
    { name: 'Node.js', claims: 189, stakes: 1654.8 },
    { name: 'Web3 Integration', claims: 134, stakes: 1423.7 },
    { name: 'Solidity', claims: 98, stakes: 1298.3 },
  ];

  const statCards = [
    { title: 'Total Users', value: protocolStats.totalUsers, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Skills Claimed', value: protocolStats.totalSkills, icon: Award, color: 'from-green-500 to-emerald-500' },
    { title: 'Total Stakes (APT)', value: protocolStats.totalStakes, icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
    { title: 'Active Challenges', value: protocolStats.activeChallenges, icon: Zap, color: 'from-red-500 to-pink-500' },
    { title: 'Verified Skills', value: protocolStats.verifiedSkills, icon: Shield, color: 'from-purple-500 to-indigo-500' },
    { title: 'Avg Reputation', value: protocolStats.averageReputation, icon: Star, color: 'from-teal-500 to-cyan-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Protocol Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {typeof stat.value === 'number' && stat.value > 1000 
                  ? `${(stat.value / 1000).toFixed(1)}K` 
                  : stat.value}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((stat.value / Math.max(...statCards.map(s => s.value))) * 100, 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trending Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
      >
        <h3 className="text-xl font-bold text-white mb-6">Trending Skills</h3>
        <div className="space-y-4">
          {trendingSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-medium">{skill.name}</h4>
                  <p className="text-white/60 text-sm">{skill.claims} claims</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{skill.stakes} APT</p>
                <p className="text-white/60 text-sm">Total Stakes</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
      >
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg cursor-pointer"
          >
            <Award className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-medium">Claim New Skill</h4>
            <p className="text-white/80 text-sm">Mint a skill NFT</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg cursor-pointer"
          >
            <TrendingUp className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-medium">Support Someone</h4>
            <p className="text-white/80 text-sm">Stake APT tokens</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg cursor-pointer"
          >
            <Zap className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-medium">Create Challenge</h4>
            <p className="text-white/80 text-sm">Challenge a skill</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg cursor-pointer"
          >
            <Star className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-medium">View Reputation</h4>
            <p className="text-white/80 text-sm">Check your stats</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
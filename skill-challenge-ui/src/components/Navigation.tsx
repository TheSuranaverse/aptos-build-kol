import React from 'react';
import { Award, TrendingUp, Zap, BarChart3, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'claim', label: 'Claim Skills', icon: Award },
    { id: 'stake', label: 'Stake & Support', icon: TrendingUp },
    { id: 'challenge', label: 'Challenges', icon: Zap },
    { id: 'reputation', label: 'Reputation', icon: BarChart3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {tabs.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium">{label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Navigation;
import React, { useState } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import WalletConnection from './components/WalletConnection';
import Navigation from './components/Navigation';
import DashboardOverview from './components/DashboardOverview';
import SkillClaim from './components/SkillClaim';
import StakingInterface from './components/StakingInterface';
import ChallengeSystem from './components/ChallengeSystem';
import ReputationDashboard from './components/ReputationDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'claim':
        return <SkillClaim />;
      case 'stake':
        return <StakingInterface />;
      case 'challenge':
        return <ChallengeSystem />;
      case 'reputation':
        return <ReputationDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Toaster position="top-right" />
        
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Skill Verification Protocol</h1>
                  <p className="text-white/60 text-sm">Decentralized skill verification on Aptos</p>
                </div>
              </div>
              <WalletConnection />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderActiveComponent()}
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;

import React from 'react';
import { User, Users, Trophy, PiggyBank } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  onSwitchToParent: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSwitchToParent }) => {
  return (
    <header className="bg-white shadow-sm border-b-4 border-gradient-to-r from-blue-400 to-purple-400">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3">
              <PiggyBank className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                KidSpend
              </h1>
              <p className="text-gray-600">Track your money like a pro! 🌟</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <Trophy className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-semibold">Level 3 Saver!</span>
            </div>
            
            <Button
              variant="outline"
              onClick={onSwitchToParent}
              className="flex items-center space-x-2 hover:bg-purple-50"
            >
              <Users className="h-4 w-4" />
              <span>Parent View</span>
            </Button>

            <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Alex</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

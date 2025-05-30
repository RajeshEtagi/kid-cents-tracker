
import React from 'react';
import { Trophy, Star, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BadgeDisplayProps {
  expenses: any[];
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ expenses }) => {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expenseCount = expenses.length;
  
  const badges = [
    {
      id: 'first-expense',
      name: 'First Step!',
      description: 'Added your first expense',
      emoji: '🎯',
      color: 'bg-blue-100 text-blue-700',
      earned: expenseCount >= 1
    },
    {
      id: 'tracker',
      name: 'Expense Tracker',
      description: 'Logged 5 expenses',
      emoji: '📊',
      color: 'bg-green-100 text-green-700',
      earned: expenseCount >= 5
    },
    {
      id: 'budget-conscious',
      name: 'Budget Conscious',
      description: 'Spent under $50',
      emoji: '💰',
      color: 'bg-yellow-100 text-yellow-700',
      earned: totalSpent > 0 && totalSpent < 50
    },
    {
      id: 'organized',
      name: 'Super Organized',
      description: 'Used 3+ categories',
      emoji: '🌟',
      color: 'bg-purple-100 text-purple-700',
      earned: new Set(expenses.map(e => e.category)).size >= 3
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-purple-700">
          <Trophy className="h-6 w-6" />
          <span>Your Badges</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {earnedBadges.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <p>Start earning badges!</p>
            <p className="text-sm">Add expenses to unlock achievements</p>
          </div>
        ) : (
          <div className="space-y-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border-2 ${badge.color} hover:scale-105 transition-transform`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{badge.emoji}</div>
                  <div>
                    <div className="font-bold">{badge.name}</div>
                    <div className="text-sm opacity-80">{badge.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-purple-200">
          <div className="text-center">
            <div className="text-sm text-purple-600 font-semibold">
              Progress: {earnedBadges.length} / {badges.length} badges earned
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';

const categoryColors = {
  food: '#ef4444',
  games: '#3b82f6',
  books: '#10b981',
  toys: '#f59e0b',
  clothes: '#8b5cf6',
  other: '#6b7280'
};

const categoryConfig = {
  food: { name: 'Food', emoji: '🍕' },
  games: { name: 'Games', emoji: '🎮' },
  books: { name: 'Books', emoji: '📚' },
  toys: { name: 'Toys', emoji: '🧸' },
  clothes: { name: 'Clothes', emoji: '👕' },
  other: { name: 'Other', emoji: '💝' }
};

interface SpendingChartProps {
  expenses: any[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ expenses }) => {
  const categoryData = Object.entries(
    expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, amount]) => ({
    category,
    name: categoryConfig[category as keyof typeof categoryConfig]?.name || category,
    emoji: categoryConfig[category as keyof typeof categoryConfig]?.emoji || '💝',
    amount,
    fill: categoryColors[category as keyof typeof categoryColors] || categoryColors.other
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{data.emoji}</span>
            <span className="font-semibold">{data.name}</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            ${data.amount.toFixed(2)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-yellow-700">
          <TrendingUp className="h-6 w-6" />
          <span>Spending Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categoryData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No data to show yet!</p>
            <p className="text-sm">Add some expenses to see your chart</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    label={({ emoji, amount }) => `${emoji} $${amount.toFixed(0)}`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {categoryData.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center space-x-2 p-2 bg-white rounded-lg border"
                >
                  <div className="text-lg">{item.emoji}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-600">${item.amount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface SpendingChartProps {
  expenses: Array<{
    id: number;
    category: string;
    amount: number;
    description: string;
    date: string;
    notes?: string;
  }>;
}

const COLORS = {
  food: '#ef4444',
  games: '#3b82f6',
  books: '#10b981',
  toys: '#f59e0b',
  clothes: '#8b5cf6',
  other: '#6b7280'
};

const categoryNames = {
  food: 'Food',
  games: 'Games',
  books: 'Books',
  toys: 'Toys',
  clothes: 'Clothes',
  other: 'Other'
};

export const SpendingChart: React.FC<SpendingChartProps> = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: categoryNames[category as keyof typeof categoryNames] || category,
    value: amount,
    color: COLORS[category as keyof typeof COLORS] || COLORS.other
  }));

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0];
      const value = typeof data.value === 'number' ? data.value : 0;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.payload.name}</p>
          <p className="text-green-600">
            ${value.toFixed(2)} ({((value / totalSpent) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          <span>Your Spending Breakdown 📊</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🤷‍♀️</div>
            <p className="text-gray-500">No expenses yet! Start tracking your spending.</p>
          </div>
        ) : (
          <>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total Spent:</span>
                <span className="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

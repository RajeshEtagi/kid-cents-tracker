
import React from 'react';
import { ArrowLeft, Mail, TrendingUp, Calendar, DollarSign, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ParentViewProps {
  expenses: any[];
  onBackToKid: () => void;
}

export const ParentView: React.FC<ParentViewProps> = ({ expenses, onBackToKid }) => {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const weeklyLimit = 100; // Example weekly limit
  const remainingBudget = weeklyLimit - totalSpent;

  const weeklyData = [
    { day: 'Mon', amount: 15 },
    { day: 'Tue', amount: 8 },
    { day: 'Wed', amount: 25 },
    { day: 'Thu', amount: 12 },
    { day: 'Fri', amount: 18 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b-4 border-indigo-400">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onBackToKid}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Kid View</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-indigo-700">Parent Dashboard</h1>
                <p className="text-gray-600">Alex's spending overview</p>
              </div>
            </div>

            <Button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700">
              <Mail className="h-4 w-4" />
              <span>Send Weekly Report</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">${totalSpent.toFixed(2)}</div>
              <p className="text-green-600 text-sm">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Remaining Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">${remainingBudget.toFixed(2)}</div>
              <p className="text-blue-600 text-sm">Out of ${weeklyLimit}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">{expenses.length}</div>
              <p className="text-purple-600 text-sm">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Avg per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800">${(totalSpent / 7).toFixed(2)}</div>
              <p className="text-orange-600 text-sm">Daily average</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Spending Chart */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <TrendingUp className="h-5 w-5" />
                <span>Weekly Spending Pattern</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Amount']}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <Calendar className="h-5 w-5" />
                <span>Recent Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{expense.description}</div>
                      <div className="text-sm text-gray-600">{expense.category}</div>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      ${expense.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Alert */}
        {remainingBudget < 20 && (
          <Card className="mt-8 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-lg font-bold text-red-800">Budget Alert!</h3>
                  <p className="text-red-700">
                    Alex is getting close to the weekly spending limit. Only ${remainingBudget.toFixed(2)} remaining.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

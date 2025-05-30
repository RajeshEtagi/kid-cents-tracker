
import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const categoryConfig = {
  food: { emoji: '🍕', color: 'bg-red-100 text-red-700' },
  games: { emoji: '🎮', color: 'bg-blue-100 text-blue-700' },
  books: { emoji: '📚', color: 'bg-green-100 text-green-700' },
  toys: { emoji: '🧸', color: 'bg-yellow-100 text-yellow-700' },
  clothes: { emoji: '👕', color: 'bg-purple-100 text-purple-700' },
  other: { emoji: '💝', color: 'bg-gray-100 text-gray-700' }
};

interface ExpenseListProps {
  expenses: any[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl font-bold text-green-700">
          <span>Recent Expenses</span>
          <div className="flex items-center space-x-1 text-lg">
            <DollarSign className="h-5 w-5" />
            <span>${totalSpent.toFixed(2)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🌟</div>
              <p>No expenses yet!</p>
              <p className="text-sm">Add your first expense to get started</p>
            </div>
          ) : (
            expenses.map((expense) => {
              const config = categoryConfig[expense.category as keyof typeof categoryConfig] || categoryConfig.other;
              return (
                <div
                  key={expense.id}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center text-xl`}>
                    {config.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{expense.description}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                    {expense.notes && (
                      <div className="text-sm text-gray-500 mt-1">{expense.notes}</div>
                    )}
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    ${expense.amount.toFixed(2)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

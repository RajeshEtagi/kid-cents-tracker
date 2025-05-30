
import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { CategorySelector } from './CategorySelector';

interface ExpenseFormProps {
  onAddExpense: (expense: any) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    category: 'food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert('Please fill in the amount and description!');
      return;
    }

    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    setFormData({
      category: 'food',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-blue-700">
          <Plus className="h-6 w-6" />
          <span>Add New Expense</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CategorySelector
            value={formData.category}
            onChange={(category) => setFormData({ ...formData, category })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount ($)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="text-lg font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What did you buy? 🛍️
            </label>
            <Input
              placeholder="e.g., Pizza for lunch"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes (optional)
            </label>
            <Textarea
              placeholder="Any extra details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Expense 🎉
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

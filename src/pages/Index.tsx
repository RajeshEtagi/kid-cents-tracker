
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { SpendingChart } from '../components/SpendingChart';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { ParentView } from '../components/ParentView';

const Index = () => {
  const [currentView, setCurrentView] = useState<'kid' | 'parent'>('kid');
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: 'food',
      amount: 12.50,
      description: 'Pizza lunch',
      date: new Date().toISOString().split('T')[0],
      notes: 'Shared with friends'
    },
    {
      id: 2,
      category: 'games',
      amount: 25.00,
      description: 'New video game',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      notes: 'Birthday gift to myself'
    }
  ]);

  const addExpense = (expense: any) => {
    const newExpense = {
      ...expense,
      id: expenses.length + 1,
    };
    setExpenses([newExpense, ...expenses]);
  };

  if (currentView === 'parent') {
    return <ParentView expenses={expenses} onBackToKid={() => setCurrentView('kid')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <DashboardHeader onSwitchToParent={() => setCurrentView('parent')} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Expense Form and Badges */}
          <div className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <BadgeDisplay expenses={expenses} />
          </div>

          {/* Middle Column - Chart */}
          <div className="lg:col-span-1">
            <SpendingChart expenses={expenses} />
          </div>

          {/* Right Column - Expense List */}
          <div className="lg:col-span-1">
            <ExpenseList expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

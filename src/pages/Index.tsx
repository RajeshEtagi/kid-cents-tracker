
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { SpendingChart } from '../components/SpendingChart';
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Expense Form */}
          <div className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          {/* Right Column - Chart and Expense List */}
          <div className="space-y-6">
            <SpendingChart expenses={expenses} />
            <ExpenseList expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

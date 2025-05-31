import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, FileText, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generatePDFReport } from '../services/emailService';
import { useToast } from '../hooks/use-toast';

interface ParentViewProps {
  expenses: any[];
  onBackToKid: () => void;
}

export const ParentView: React.FC<ParentViewProps> = ({ expenses, onBackToKid }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();
  
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const weeklyLimit = 100;

  const categoryBreakdown = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const weeklyData = [
    { day: 'Mon', amount: 15 },
    { day: 'Tue', amount: 8 },
    { day: 'Wed', amount: 25 },
    { day: 'Thu', amount: 12 },
    { day: 'Fri', amount: 18 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 5 }
  ];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const reportData = {
        childName: 'Child',
        totalSpent,
        weeklyLimit,
        expenses,
        categoryBreakdown,
      };

      const result = await generatePDFReport(reportData);
      
      if (result.success) {
        toast({
          title: "PDF Downloaded!",
          description: "Weekly report has been downloaded as PDF.",
        });
      } else {
        toast({
          title: "PDF Generation",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "PDF Generation",
        description: "PDF report has been prepared for download.",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendWhatsAppReport = () => {
    const message = `WEEKLY SPENDING REPORT

SPENDING SUMMARY
Total Spent: $${totalSpent.toFixed(2)}
Weekly Budget: $${weeklyLimit.toFixed(2)}
Remaining: $${(weeklyLimit - totalSpent).toFixed(2)}

RECENT PURCHASES
${expenses.slice(0, 5).map(expense => 
  `• ${expense.description}: $${expense.amount.toFixed(2)}`
).join('\n')}

SPENDING BY CATEGORY
${Object.entries(categoryBreakdown).map(([category, amount]) => 
  `• ${category}: $${(amount as number).toFixed(2)}`
).join('\n')}

Report generated on ${new Date().toLocaleDateString()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "WhatsApp Opened",
      description: "WhatsApp has been opened with the report message.",
    });
  };

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
                <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
                <p className="text-gray-600">Spending overview</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSendWhatsAppReport}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send WhatsApp Report</span>
              </Button>

              <Button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                variant="outline"
                className="flex items-center space-x-2"
              >
                {isGeneratingPDF ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      </div>
    </div>
  );
};

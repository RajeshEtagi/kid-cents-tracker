
interface WeeklyReportData {
  childName: string;
  totalSpent: number;
  weeklyLimit: number;
  expenses: Array<{
    id: number;
    category: string;
    amount: number;
    description: string;
    date: string;
    notes?: string;
  }>;
  categoryBreakdown: Record<string, number>;
}

export const sendWeeklyReport = async (parentEmail: string, reportData: WeeklyReportData) => {
  try {
    // Mock implementation - simulate sending email report
    console.log('Sending weekly report to:', parentEmail);
    console.log('Report data:', reportData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful response
    return {
      success: true,
      message: 'Weekly report sent successfully',
      timestamp: new Date().toISOString(),
      recipient: parentEmail
    };
  } catch (error) {
    console.error('Error sending weekly report:', error);
    // Don't throw error - return a graceful response instead
    return {
      success: false,
      message: 'Email service temporarily unavailable',
      timestamp: new Date().toISOString(),
      recipient: parentEmail
    };
  }
};

export const generatePDFReport = async (reportData: WeeklyReportData) => {
  try {
    // Mock PDF generation - in a real app, you'd use a library like jsPDF or react-pdf
    console.log('Generating PDF report for:', reportData.childName);
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a simple text-based "PDF" content for demonstration
    const pdfContent = `
WEEKLY SPENDING REPORT
Child: ${reportData.childName}
Report Date: ${new Date().toLocaleDateString()}

SUMMARY
Total Spent: $${reportData.totalSpent.toFixed(2)}
Weekly Limit: $${reportData.weeklyLimit.toFixed(2)}
Remaining Budget: $${(reportData.weeklyLimit - reportData.totalSpent).toFixed(2)}

EXPENSES
${reportData.expenses.map(expense => 
  `${expense.date} - ${expense.description} (${expense.category}): $${expense.amount.toFixed(2)}`
).join('\n')}

CATEGORY BREAKDOWN
${Object.entries(reportData.categoryBreakdown).map(([category, amount]) => 
  `${category}: $${amount.toFixed(2)}`
).join('\n')}
    `;
    
    // Create a downloadable blob
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `weekly-report-${reportData.childName}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
    
    return {
      success: true,
      message: 'PDF report generated successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating PDF report:', error);
    // Don't throw error - return a graceful response instead
    return {
      success: false,
      message: 'PDF generation temporarily unavailable',
      timestamp: new Date().toISOString()
    };
  }
};

export const scheduleWeeklyReport = async (parentEmail: string, childId: string) => {
  try {
    // Mock implementation for scheduling
    console.log('Scheduling weekly report for:', parentEmail, 'child:', childId);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Weekly report scheduled successfully',
      schedule: {
        frequency: 'weekly',
        dayOfWeek: 'sunday',
        time: '09:00'
      }
    };
  } catch (error) {
    console.error('Error scheduling weekly report:', error);
    // Don't throw error - return a graceful response instead
    return {
      success: false,
      message: 'Scheduling service temporarily unavailable',
      schedule: null
    };
  }
};

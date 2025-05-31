
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

export const generatePDFReport = async (reportData: WeeklyReportData) => {
  try {
    // Mock PDF generation - in a real app, you'd use a library like jsPDF or react-pdf
    console.log('Generating PDF report');
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a simple text-based "PDF" content for demonstration
    const pdfContent = `
WEEKLY SPENDING REPORT
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
    link.download = `weekly-report-${new Date().toISOString().split('T')[0]}.txt`;
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
    return {
      success: false,
      message: 'PDF generation temporarily unavailable',
      timestamp: new Date().toISOString()
    };
  }
};

export const sendWhatsAppReport = async (phoneNumber: string, reportData: WeeklyReportData) => {
  try {
    // Mock WhatsApp implementation - simulate sending report
    console.log('Sending WhatsApp report to:', phoneNumber);
    console.log('Report data:', reportData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create WhatsApp message content
    const message = `📊 *WEEKLY SPENDING REPORT*

💰 *Summary:*
• Total Spent: $${reportData.totalSpent.toFixed(2)}
• Weekly Limit: $${reportData.weeklyLimit.toFixed(2)}
• Remaining: $${(reportData.weeklyLimit - reportData.totalSpent).toFixed(2)}

📝 *Recent Expenses:*
${reportData.expenses.slice(0, 5).map(expense => 
  `• ${expense.description}: $${expense.amount.toFixed(2)}`
).join('\n')}

📈 *Category Breakdown:*
${Object.entries(reportData.categoryBreakdown).map(([category, amount]) => 
  `• ${category}: $${amount.toFixed(2)}`
).join('\n')}

Report generated on ${new Date().toLocaleDateString()}`;

    console.log('WhatsApp message:', message);
    
    // Simulate successful response
    return {
      success: true,
      message: 'WhatsApp report sent successfully',
      timestamp: new Date().toISOString(),
      recipient: phoneNumber
    };
  } catch (error) {
    console.error('Error sending WhatsApp report:', error);
    return {
      success: false,
      message: 'WhatsApp service temporarily unavailable',
      timestamp: new Date().toISOString(),
      recipient: phoneNumber
    };
  }
};


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
    // In a real application, this would call your backend API
    // For demonstration, we'll simulate the API call
    const response = await fetch('/api/send-weekly-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parentEmail,
        reportData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send weekly report');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending weekly report:', error);
    throw error;
  }
};

export const scheduleWeeklyReport = async (parentEmail: string, childId: string) => {
  try {
    const response = await fetch('/api/schedule-weekly-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parentEmail,
        childId,
        frequency: 'weekly',
        dayOfWeek: 'sunday',
        time: '09:00',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule weekly report');
    }

    return await response.json();
  } catch (error) {
    console.error('Error scheduling weekly report:', error);
    throw error;
  }
};

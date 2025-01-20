// interfaces/RecurringExpense.ts
export interface RecurringExpense {
    _id: string;
    userId: string;
    title: string;
    amount: number;
    categoryId: string;
    frequency: string;  // e.g., daily, weekly, monthly
    startDate: Date;
    endDate: Date | null; // null if indefinitely recurring
    createdAt: Date;
    updatedAt: Date;
  }
  
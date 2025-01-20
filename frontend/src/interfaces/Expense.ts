// interfaces/Expense.ts
export interface Expense {
    _id: string;
    userId: string;
    title: string;
    amount: number;
    categoryId: string;
    date: Date;
    isRecurring: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
import { Category } from "./Category";
export interface IRecurringExpense {
    _id: string;
    userId: string;
    title: string;
    amount: number;
    categoryId: Category;
    frequency: string;  // e.g., daily, weekly, monthly
    startDate: Date;
    endDate: Date | null; // null if indefinitely recurring
    createdAt: Date;
    updatedAt: Date;
  }
  
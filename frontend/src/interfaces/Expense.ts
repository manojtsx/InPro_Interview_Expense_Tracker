import { User } from "./User";
import { Category } from "./Category";

export interface Expense {
  _id: string;
  userId: User;
  title: string;
  amount: number;
  categoryId: Category;
  date: Date;
  isRecurring: boolean;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}
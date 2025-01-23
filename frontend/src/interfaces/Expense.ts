
import {User} from '@/interfaces/User';
import { Category } from '@/interfaces/Category';
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
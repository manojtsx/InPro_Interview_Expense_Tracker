import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = new this.expenseModel(createExpenseDto);
    return newExpense.save();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().populate('category user').exec();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).populate('category user').exec();
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true }).exec();
    if (!updatedExpense) {
      throw new Error('Expense not found');
    }
    return updatedExpense;
  }

  async delete(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!deletedExpense) {
      throw new Error('Expense not found');
    }
    return deletedExpense;
  }
}

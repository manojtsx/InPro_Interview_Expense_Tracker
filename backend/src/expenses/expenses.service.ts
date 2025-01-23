import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Category } from 'src/categories/schemas/category.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(User.name) private readonly userModel: Model<User>) { }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    console.log(createExpenseDto);
    const newExpense = new this.expenseModel(createExpenseDto);
    const result = await newExpense.save();
    if (!result) {
      throw new Error('Could not create expense');
    }
    return result;
  }

  async findAll(userId : string): Promise<Expense[]> {
    const result = await this.expenseModel.find({userId}).populate('categoryId userId').exec();
    if (!result) {
      throw new Error('No expenses found');
    }
    return result;
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).populate('categoryId userId').exec();
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

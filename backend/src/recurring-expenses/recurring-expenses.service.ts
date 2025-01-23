import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecurringExpense } from './schemas/recurring-expense.schema';
import { Model } from 'mongoose';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';

@Injectable()
export class RecurringExpensesService {
    constructor(@InjectModel(RecurringExpense.name) private recurringExpenseModel: Model<RecurringExpense>) {}

  async create(createDto: CreateRecurringExpenseDto): Promise<RecurringExpense> {
    const newExpense = new this.recurringExpenseModel(createDto);
    return newExpense.save();
  }

  async findAll(): Promise<RecurringExpense[]> {
   const result = await this.recurringExpenseModel.find().populate('userId categoryId').exec();
   if(!result){
     throw new Error('RecurringExpense not found');
   }
    return result;
  }

  async findOne(id: string): Promise<RecurringExpense> {
    const expense = await this.recurringExpenseModel.findById(id).populate('userId categoryId').exec();
    if (!expense) {
      throw new Error('RecurringExpense not found');
    }
    return expense;
  }

  async update(id: string, updateDto: UpdateRecurringExpenseDto): Promise<RecurringExpense> {
    const updatedExpense = await this.recurringExpenseModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updatedExpense) {
      throw new Error('RecurringExpense not found');
    }
    return updatedExpense;
  }

  async delete(id: string): Promise<RecurringExpense> {
    const deletedExpense = await this.recurringExpenseModel.findByIdAndDelete(id).exec();
    if (!deletedExpense) {
      throw new Error('RecurringExpense not found');
    }
    return deletedExpense;
  }

}

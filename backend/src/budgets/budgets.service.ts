import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './schemas/budget.schema';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const newBudget = new this.budgetModel(createBudgetDto);
    return newBudget.save();
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetModel.find().populate('user categories').exec();
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id).populate('user categories').exec();
    if (!budget) {
      throw new Error('Budget not found');
    }
    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const updatedBudget = await this.budgetModel.findByIdAndUpdate(id, updateBudgetDto, { new: true }).exec();
    if (!updatedBudget) {
      throw new Error('Budget not found');
    }
    return updatedBudget;
  }

  async delete(id: string): Promise<Budget> {
    const deletedBudget = await this.budgetModel.findByIdAndDelete(id).exec();
    if (!deletedBudget) {
      throw new Error('Budget not found');
    }
    return deletedBudget;
  }
}

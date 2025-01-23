import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './schemas/expense.schema';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    try {
      console.log("Received Data : ", createExpenseDto)
      await this.expensesService.create(createExpenseDto);
      return { message: 'Expense Created Successfully.' };
    } catch (error) {
      return { message: error.message }
    }
  }

  @Get()
  async findAll(@Req() req): Promise<Expense[]> {
    const userId = req.user.sub;
    return await this.expensesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Expense> {
    return await this.expensesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    try{
      const result = await this.expensesService.update(id, updateExpenseDto);
      if(!result){
        throw new Error('Expense not found');
      }
      return { message: 'Expense Updated Successfully.' };
    }catch(error){
      return { message: error.message}
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try{
      await this.expensesService.delete(id);
      return {message : "Expense Deleted Successfully"}
    }catch(error){
      return { message: error.message}
    }
  
  }
}

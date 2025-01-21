import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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
  async findAll() {
    return await this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
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

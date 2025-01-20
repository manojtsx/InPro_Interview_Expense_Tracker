import { Module } from '@nestjs/common';
import { RecurringExpensesService } from './recurring-expenses.service';
import { RecurringExpensesController } from './recurring-expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringExpense, RecurringExpenseSchema } from './schemas/recurring-expense.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RecurringExpense.name, schema: RecurringExpenseSchema }])],
  providers: [RecurringExpensesService],
  controllers: [RecurringExpensesController]
})
export class RecurringExpensesModule {}

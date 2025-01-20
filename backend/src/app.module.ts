import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';
import { RecurringExpensesModule } from './recurring-expenses/recurring-expenses.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {
    }),
    UsersModule,
    ExpensesModule,
    CategoriesModule,
    BudgetsModule,
    RecurringExpensesModule,
    ReportsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    this.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
  }
 }

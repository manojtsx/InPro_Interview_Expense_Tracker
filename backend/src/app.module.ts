import { MiddlewareConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

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
    NotificationsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "expenses", method: RequestMethod.ALL
    },
      {
        path: "users", method: RequestMethod.GET
      },
      {
        path: "users", method: RequestMethod.PUT
      },
      {
        path: "users", method: RequestMethod.DELETE
      },
      {
        path: "categories", method: RequestMethod.ALL
      },
      {
        path: "budgets", method: RequestMethod.ALL
      },
      {
        path: "recurring-expenses", method: RequestMethod.ALL
      },
      {
        path: "reports", method: RequestMethod.ALL
      },
      {
        path: "notifications", method: RequestMethod.ALL
      }
    )
  }
  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    this.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
  }
}

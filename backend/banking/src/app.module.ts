import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from './accounts/accounts.module.js';
import { PayeesModule } from './payees/payees.module.js';
import { TransactionsModule } from './transactions/transactions.module.js';
import { BillPaymentModule } from './bill-payment/bill-payment.module.js';
import { DashboardAnalyticsModule } from './dashboard-analytics/dashboard-analytics.module.js';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule,
    AuthModule,
    AccountsModule,
    PayeesModule,
    TransactionsModule,
    BillPaymentModule,
    DashboardAnalyticsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

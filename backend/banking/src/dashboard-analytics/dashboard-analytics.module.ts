import { Module } from '@nestjs/common';
import { DashboardAnalyticsController } from './dashboard-analytics.controller.js';
import { DashboardAnalyticsService } from './dashboard-analytics.service.js';
import {CommonModule} from "../common/common.module.js";
import {TransactionsModule} from "../transactions/transactions.module.js";
import {UsersModule} from "../users/users.module.js";
import {AccountsModule} from "../accounts/accounts.module.js"

@Module({
  imports:[CommonModule,TransactionsModule,UsersModule,AccountsModule],
  controllers: [DashboardAnalyticsController],
  providers: [DashboardAnalyticsService]
})
export class DashboardAnalyticsModule {}

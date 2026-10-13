import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller.js';
import { TransactionsService } from './transactions.service.js';
import {CommonModule} from "../common/common.module.js";
import {MongooseModule} from "@nestjs/mongoose";
import {Transactions,TransactionsSchema} from "./schemas/transactions.schema.js"
import {AccountsModule} from "../accounts/accounts.module.js";
import {PayeesModule} from "../payees/payees.module.js";

@Module({
  imports:[CommonModule,
    AccountsModule,
    PayeesModule,
    MongooseModule.forFeature([
      {
        name:Transactions.name,
        schema:TransactionsSchema
      }
    ])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports:[MongooseModule,TransactionsService]
})
export class TransactionsModule {}

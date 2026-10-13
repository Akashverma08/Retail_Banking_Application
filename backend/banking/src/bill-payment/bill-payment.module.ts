import { Module } from '@nestjs/common';
import { BillPaymentController } from './bill-payment.controller.js';
import { BillPaymentService } from './bill-payment.service.js';
import {CommonModule} from "../common/common.module.js";
import {MongooseModule} from "@nestjs/mongoose";
import {BillPayment,BillsSchema} from "./schemas/BillPayment.schema.js";
import {TransactionsModule} from "../transactions/transactions.module.js";
import {AccountsModule} from "../accounts/accounts.module.js"

@Module({
  imports:[CommonModule,
    TransactionsModule,
    AccountsModule,
    MongooseModule.forFeature([
      {
        name:BillPayment.name,
        schema:BillsSchema
      }
    ])

  ],
  controllers: [BillPaymentController],
  providers: [BillPaymentService]
})
export class BillPaymentModule {}

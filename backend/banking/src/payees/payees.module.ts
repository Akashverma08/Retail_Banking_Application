import { Module } from '@nestjs/common';
import { PayeesController } from './payees.controller.js';
import { PayeesService } from './payees.service.js';
import {CommonModule} from "../common/common.module.js";
import {Payees,PayeesSchema} from "./schemas/payees.schema.js";
import {AccountsModule} from "../accounts/accounts.module.js";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports:[CommonModule,
    AccountsModule,
     MongooseModule.forFeature([
      {
        name:Payees.name,
        schema:PayeesSchema
      }
     ])
  ],
  controllers: [PayeesController],
  providers: [PayeesService]
})
export class PayeesModule {}

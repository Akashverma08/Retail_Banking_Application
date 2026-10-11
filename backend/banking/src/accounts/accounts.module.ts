import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller.js';
import { AccountsService } from './accounts.service.js';
import {MongooseModule} from "@nestjs/mongoose";
import {Account,AccountSchema} from "./schemas/accounts.schema.js"
import {CommonModule} from "../common/common.module.js";
import {UsersModule} from "../users/users.module.js";

@Module({
  imports:[CommonModule,UsersModule,
    MongooseModule.forFeature([
      {
        name:Account.name,
        schema:AccountSchema
      }
    ])
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports:[MongooseModule,AccountsService]
})
export class AccountsModule {}

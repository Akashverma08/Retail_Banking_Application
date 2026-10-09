import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import {MongooseModule} from "@nestjs/mongoose";
import {Users,UsersSchema} from "./schemas/users.schema.js"
import {CommonModule} from "../common/common.module.js"

@Module({
  imports:[CommonModule,
    MongooseModule.forFeature([
      {
        name:Users.name,
        schema:UsersSchema
      }
    ])

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[MongooseModule,UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from "../users/users.module.js";

import {CommonModule} from "../common/common.module.js"

@Module({
  imports: [CommonModule,UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }

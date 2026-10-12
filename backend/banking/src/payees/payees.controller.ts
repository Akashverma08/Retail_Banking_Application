
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PayeesService } from './payees.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreatePayeeDTO } from './dto/create-payee.dto.js';
import {UpdatePayeeDTO} from "./dto/update-payee.dto.js";

@Controller('payees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Customer')
export class PayeesController {
  constructor(private readonly payeeService: PayeesService) {}

  @Post()
  async addPayee(@Body() body: CreatePayeeDTO, @Req() req: any) {
    return this.payeeService.addPayee(body, req.user.sub);
  }

  @Get()
  async getPayees(@Req() req: any) {
    return this.payeeService.getPayees(req.user.sub);
  }

  @Get(':id')
  async getPayeeById(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.payeeService.getPayeeById(id, req.user.sub);
  }

  @Patch(':id')
  async updatePayee(@Param('id') id: string,@Body() body: UpdatePayeeDTO,@Req() req: any) {
    return this.payeeService.updatePayee(id,body, req.user.sub);
  }

  @Delete(':id')
  async deletePayee(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.payeeService.deletePayee(id, req.user.sub);
  }
}

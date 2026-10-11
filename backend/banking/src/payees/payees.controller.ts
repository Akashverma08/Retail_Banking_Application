import { Body, Controller, Post, Req, UseGuards }  from '@nestjs/common';
import {PayeesService} from "./payees.service.js";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard.js";
import {RolesGuard} from "../common//guards/roles.guard.js";
import { Roles } from '../common/decorators/roles.decorator.js';
import {CreatePayeeDTO} from "./dto/create-payee.dto.js";

@Controller('payees')
export class PayeesController {
    constructor(private readonly payeeService:PayeesService){}

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('Customer')
    @Post()
    async addPayee(@Body() body:CreatePayeeDTO,@Req() req:any){
        return this.payeeService.addPayee(body,req.user.sub);

    }


}

import { Body, Controller, Get, Post,Req,UseGuards } from '@nestjs/common';
import {BillPaymentService} from "./bill-payment.service.js";
import { CreateBillPaymentDto } from "./dto/create-bill.dto.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { Roles } from "../common/decorators/roles.decorator.js";



@Controller("bill-payment")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("Customer")
@Controller('bill-payment')
export class BillPaymentController {
    constructor(private readonly billPaymentService:BillPaymentService){}

    @Post()
    async createBillPayment(@Body() body:CreateBillPaymentDto,@Req() req:any){
        return this.billPaymentService.createBillPayment(body,req.user.sub);
    }

    @Get()
    async getMyBillPayments(@Req() req:any){
        return this.billPaymentService.getMyBillPayments(req.user.sub)
    }
}

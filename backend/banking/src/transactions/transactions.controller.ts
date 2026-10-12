import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionsService } from "./transactions.service.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { CreateTransactionsDTO } from "./dto/create-transactions.dto.js";


@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Customer")
    @Post()
    async transfer(@Body() body: CreateTransactionsDTO, @Req() req: any) {
        return this.transactionsService.transfer(body, req.user.sub)

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Customer")
    @Get()
    async getTransactions(@Req() req: any) {
        return this.transactionsService.getTransactions(req.user.sub);

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Get("/admin")
    async getAllTransactions(){
        return this.transactionsService.getAllTransactions()
    }


}

import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from "./accounts.service.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common//guards/roles.guard.js";
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateAccountDTO } from "./dto/create-acoounts.dto.js";

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountsService: AccountsService) { }

    @Roles("Admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async addAccount(@Body() body: CreateAccountDTO, @Req() req: any) {
        return this.accountsService.addAccount(body, req.user.sub)
    }

    @Roles("Admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllAccounts() {
        return this.accountsService.getAllAccounts();
    }

    @Roles("Admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("user/:userId")
    async getAccountsByUserId(@Param("userId") userId: string) {
        return this.accountsService.getAccountsByUserId(userId);
    }

    @Roles("Customer")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("/me")
    async getAccountById(@Req() req: any) {
        return this.accountsService.getAccountById(req.user.sub);
    }

    @Roles("Admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(":id/freeze")
    async freezeAccount(@Param('id') id:string){
        return this.accountsService.toggleFreezeAccount(id)
    }

}

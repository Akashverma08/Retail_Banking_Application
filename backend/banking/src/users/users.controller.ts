import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service.js";
import { CreateUserDTO } from "./dto/create-user.dto.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { Roles } from '../common/decorators/roles.decorator.js';;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Post()
    async adduser(@Body() body: CreateUserDTO,@Req() req:any) {
        return this.usersService.addUsers(body,req.user.sub);

    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Customer')
    @Get("/customer")
    async getUser(@Req() req:any){
        //console.log(req.user);
        return this.usersService.getUser(req.user.sub);

    }





}

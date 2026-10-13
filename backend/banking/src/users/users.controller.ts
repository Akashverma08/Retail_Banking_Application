import { Body, Controller, Get, Post, Req, UseGuards, Param, Patch, Query } from '@nestjs/common';
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
    async adduser(@Body() body: CreateUserDTO, @Req() req: any) {
        return this.usersService.addUsers(body, req.user.sub);

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Get()
    async getAllUsers(@Query("search") search ?: string,
        @Query("role") role ?: string,
        @Query("status") status ?: string,) {
        return this.usersService.getAllUsers({ search, role, status });

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Customer')
    @Get("/customer")
    async getUser(@Req() req: any) {
        //console.log(req.user);
        return this.usersService.getUser(req.user.sub);

    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Roles("Admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(":id/lock")
    async toggleUserLock(@Param("id") id: string) {
        return this.usersService.toggleUserLock(id);
    }
}

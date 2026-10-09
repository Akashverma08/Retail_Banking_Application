import { Body, Controller, Post } from '@nestjs/common';
import {LoginDTO} from "./dto/login.dto.js";
import {AuthService} from "./auth.service.js";
import {UsersService} from "../users/users.service.js";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService,
        private readonly usersService:UsersService
    ){}

    @Post("/login")
    async authLogin(@Body() body:LoginDTO){
        return this.authService.authLogin(body)

    }

}

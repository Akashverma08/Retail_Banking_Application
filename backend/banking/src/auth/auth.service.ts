import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../users/schemas/users.schema.js";
import { LoginDTO } from "./dto/login.dto.js";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {

    constructor(@InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
     private readonly jwtService:JwtService) { }


    async authLogin(body: LoginDTO) {
        const user = await this.usersModel.findOne({
            email: body.email,
        });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(
            body.password,
            user.passwordHash,
        );

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const payload={
            sub:user.id,
            email:user.email,
            role:user.role
        }


        const accessToken=this.jwtService.sign(payload);



        return {
            message: 'Login Successfully',
            accessToken:accessToken,
            role:user.role
        };
    }

}

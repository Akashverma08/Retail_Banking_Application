import { Injectable, ConflictException,NotFoundException ,ForbiddenException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "./schemas/users.schema.js";
import { CreateUserDTO } from "./dto/create-user.dto.js";
import * as bcrypt from "bcrypt";


@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name)
    private readonly usersModel: Model<Users>) { }

    async addUsers(body: CreateUserDTO,userId:string) {
        try {

            const existingUser = await this.usersModel.findOne({ email: body.email });
            if (existingUser) {
                throw new ConflictException("User already Exist");
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);

            return await this.usersModel.create({
                name: body.name,
                email: body.email,
                passwordHash: hashedPassword,
                role: body.role,
                userId:userId


            })

        } catch (err) {
            throw new Error("Unable to add Users")
        }
    }


    //Get All users 

    async getAllUsers() {
        try {
            return await this.usersModel.find();

        } catch (err) {
            throw new Error("Unable to getAllUser()")
        }
    }


    //Get User

    async getUser(userId: string) {

        try {
            return await this.usersModel.findOne({ id: userId });


        } catch (err) {
            throw new Error("Unable to get User");
        }

    }

    async getCustomerById(userId: string) {
        const user = await this.usersModel.findOne({ id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role !== 'Customer') {
            throw new ForbiddenException('Account can only be created for a customer');
        }

        return user;
    }


}

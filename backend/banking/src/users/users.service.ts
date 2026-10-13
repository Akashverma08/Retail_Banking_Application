import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "./schemas/users.schema.js";
import { CreateUserDTO } from "./dto/create-user.dto.js";
import * as bcrypt from "bcrypt";


@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name)
    private readonly usersModel: Model<Users>) { }

    async addUsers(body: CreateUserDTO, userId: string) {
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
                userId: userId


            })

        } catch (err) {
            throw new Error("Unable to add Users")
        }
    }


    //Get All users 

    async getAllUsers(filters: {
        search?: string;
        role?: string;
        status?: string;
    }) {
        const query: any = {};

        if (filters.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: "i" } },
                { email: { $regex: filters.search, $options: "i" } },
            ];
        }

        if (filters.role) {
            query.role = filters.role;
        }

        if (filters.status) {
            query.isLocked = filters.status === "locked";
        }

        return this.usersModel.find(query).sort({ createdAt: -1 }).select("-passwordHash").exec();
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

    async getUserById(id: string) {
        const user = await this.usersModel.findOne({ id }).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async toggleUserLock(id: string) {
        const user = await this.usersModel.findOne({ id }).exec();

        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.isLocked = !user.isLocked;
        await user.save();

        return {
            message: user.isLocked
                ? "User locked successfully"
                : "User unlocked successfully",
            user,
        };
    }


}

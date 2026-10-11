import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'crypto';
import { Account } from './schemas/accounts.schema.js';
import { CreateAccountDTO } from './dto/create-acoounts.dto.js';
import { UsersService } from "../users/users.service.js";

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
    private readonly usersService: UsersService
  ) { }

  async addAccount(body: CreateAccountDTO, adminId: string) {
    const balance = body.balance ?? 0;

    if (balance < 0) {
      throw new BadRequestException('Balance cannot be negative');
    }


    await this.usersService.getCustomerById(body.userId);

    const accountNumber = `60${randomInt(600000000, 800000000)}`;
    const maskedNumber = `XXXX XXXX ${accountNumber.slice(-4)}`;
    try {
      return await this.accountModel.create({
        userId: body.userId,
        createdById: adminId,
        type: body.type,
        accountNumber,
        maskedNumber,
        balance,
        currency: body.currency ?? 'INR',
        dailyLimit: body.dailyLimit,
        isFrozen: false,
      });
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new ConflictException('Account number already exists');
      }

      console.error('Account creation error:', err);
      throw new InternalServerErrorException('Unable to create account');
    }
  }


  async getAllAccounts() {
    try {

      return await this.accountModel.find();

    } catch (err) {

      throw new InternalServerErrorException("Unable to fetch Accounts");


    }
  }

  async getAccountById(userId: string) {
    try {
      return await this.accountModel
        .find({ userId })
        .select("+accountNumber");
    } catch (err) {
      console.error("Error fetching accounts:", err);

      throw new InternalServerErrorException(
        "Unable to fetch accounts",
      );
    }
  }



  async findByAccountNumber(accountNumber: string) {
    return this.accountModel.findOne({ accountNumber }).exec();
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payees } from './schemas/payees.schema.js';
import { CreatePayeeDTO } from './dto/create-payee.dto.js';
import { AccountsService } from '../accounts/accounts.service.js';

@Injectable()
export class PayeesService {
  constructor(
    @InjectModel(Payees.name)
    private readonly payeesModel: Model<Payees>,

    private readonly accountsService: AccountsService,
  ) {}

  async addPayee(body: CreatePayeeDTO, userId: string) {
    const account = await this.accountsService.findByAccountNumber(body.accountNumber);

    if (!account) {
      throw new NotFoundException('Beneficiary account not found');
    }


    if (account.userId === userId) {
      throw new BadRequestException('You cannot add your own account as a payee');
    }

  
    return this.payeesModel.create({
      userId,
      name: body.name,
      accountNumber: body.accountNumber,
      ifsc: body.ifsc,
      nickname: body.nickname,
      isVerified: false,
    });
  }
}

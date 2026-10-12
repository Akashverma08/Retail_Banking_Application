
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException, HttpException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payees } from './schemas/payees.schema.js';
import { CreatePayeeDTO } from './dto/create-payee.dto.js';
import { UpdatePayeeDTO } from './dto/update-payee.dto.js';
import { AccountsService } from '../accounts/accounts.service.js';

@Injectable()
export class PayeesService {
    constructor(
        @InjectModel(Payees.name)
        private readonly payeesModel: Model<Payees>,
        private readonly accountsService: AccountsService,
    ) { }

    async addPayee(body: CreatePayeeDTO, userId: string) {
        const account = await this.accountsService.findByAccountNumber(body.accountNumber);

        if (!account) {
            throw new NotFoundException('Beneficiary account not found');
        }

        if (account.userId === userId) {
            throw new BadRequestException(
                'You cannot add your own account as a payee',
            );
        }

        if (account.isFrozen) {
            throw new BadRequestException(
                'Cannot add a frozen account as a payee',
            );
        }

        // If Account schema stores IFSC, verify it here too.

        return this.payeesModel.create({
            userId,
            name: body.name,
            accountNumber: body.accountNumber,
            ifsc: body.ifsc,
            nickname: body.nickname,
            isVerified: true,
        });
    }



    async getPayees(userId: string) {
        return this.payeesModel.find({ userId }).exec();
    }




    async getPayeeById(id: string, userId: string) {
        const payee = await this.payeesModel.findOne({ id, userId });

        if (!payee) {
            throw new NotFoundException('Payee not found');
        }

        return payee;
    }

    async updatePayee(id: string, body: UpdatePayeeDTO, userId: string) {
        try {
            // 1. Check account only if accountNumber is provided
            if (body.accountNumber) {
                const account = await this.accountsService.findByAccountNumber(body.accountNumber,);

                if (!account) {
                    throw new NotFoundException('Beneficiary account not found');
                }


                if (account.userId === userId) {
                    throw new BadRequestException('You cannot add your own account as a payee');
                }

                if (account.isFrozen) {
                    throw new BadRequestException(
                        'Cannot add a frozen account as a payee',
                    );
                }
            }


            const payee = await this.payeesModel.findOneAndUpdate(
                { id, userId },
                { $set: body },
                { new: true, runValidators: true },
            )
                .exec();

            if (!payee) {
                throw new NotFoundException('Payee not found');
            }

            return payee;
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }

            throw new InternalServerErrorException('Failed to update payee');
        }
    }

    async deletePayee(id: string, userId: string) {
        const payee = await this.payeesModel
            .findOneAndDelete({ id, userId });

        if (!payee) {
            throw new NotFoundException('Payee not found');
        }

        return {
            message: 'Payee deleted successfully',
        };
    }
}

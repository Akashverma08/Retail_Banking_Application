import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account } from "../accounts/schemas/accounts.schema.js";
import { Transactions } from "./schemas/transactions.schema.js";
import { AccountsService } from "../accounts/accounts.service.js";
import { CreateTransactionsDTO } from "./dto/create-transactions.dto.js";
import { PayeesService } from "../payees/payees.service.js";
import { randomUUID } from 'crypto';


@Injectable()
export class TransactionsService {
    constructor(@InjectModel(Transactions.name)
    private readonly transactionsModel: Model<Transactions>,
        @InjectModel(Account.name)
        private readonly accountsModel: Model<Account>,
        private readonly accountsService: AccountsService,
        private readonly payeesService: PayeesService,) { }



    async transfer(body: CreateTransactionsDTO, userId: string) {
        const account = await this.accountsService.findByAccountNumber(body.accountNumber);

        if (!account) {
            throw new NotFoundException('Account not found');
        }

        if (account.userId !== userId) {
            throw new ForbiddenException("Cannot transfer from another user account")
        }

        const payee = await this.payeesService.getPayeeById(body.payeeId, userId);

        if (!payee.isVerified) {
            throw new BadRequestException('Payee is not verified')
        }

        if (account.isFrozen) {
            throw new BadRequestException("Cannot transfer to frozen account");
        }

        if (body.amount <= 0) {
            throw new BadRequestException("Amount must be greater than 0");

        }

        if (account.balance < body.amount) {
            throw new BadRequestException("Insufficient Balance");
        }


        const receiver = await this.accountsService.findByAccountNumber(payee.accountNumber);

        if (!receiver) {
            throw new NotFoundException("Reciever Account Not Found");
        }

        if (receiver.isFrozen) {
            throw new BadRequestException('Receiver account is frozen');
        }


        if (account.id === receiver.id) {
            throw new BadRequestException(
                'Cannot transfer to your own account',
            );
        }

        //Step 6 — Sender ke account se paise debit karna

        const updatedSender = await this.accountsService.debitAccount(account.id, body.amount);

        if (!updatedSender) {
            throw new BadRequestException('Unable to debit: insufficient balance or account unavailable')
        }

        //Step 7 — Receiver ke account mein paise credit karna

        const updatedReceiver = await this.accountsService.creditAccount(receiver.id, body.amount);

        if (!updatedReceiver) {
            throw new BadRequestException("Unable to Credit to Receiver account")
        }


        const referenceNumber = randomUUID();

        const transactions = await this.transactionsModel.insertMany([
            {
                userId,
                accountId: account.id,
                payeeId: payee.id,
                type: 'debit',
                amount: body.amount,
                balanceAfter: updatedSender.balance,
                description: body.description ?? "Money Transfer",
                category: body.category ?? "transfer",
                referenceNumber
            },
            {
                userId: receiver.userId,
                accountId: receiver.id,
                payeeId: payee.id,
                type: 'credit',
                amount: body.amount,
                balanceAfter: updatedReceiver.balance,
                description: body.description ?? "Money Transfer",
                category: body.category ?? "transfer",
                referenceNumber


            }
        ]);

        return {
            message: "Transfer SuccessFully",
            referenceNumber,
            transactions
        }

    }


    async getTransactions(userId: string) {
        return this.transactionsModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .exec();
    }

    async getAllTransactions() {
        return this.transactionsModel
            .find()
            .sort({ createdAt: -1 })
            .exec();

    }
}

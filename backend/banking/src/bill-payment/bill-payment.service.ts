
import {
    Injectable, InternalServerErrorException,
    NotFoundException, ForbiddenException, BadRequestException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { randomUUID } from "crypto";
import { Transactions } from "../transactions/schemas/transactions.schema.js";
import { AccountsService } from "../accounts/accounts.service.js";
import { BillPayment } from "./schemas/BillPayment.schema.js";
import { CreateBillPaymentDto } from "./dto/create-bill.dto.js";


@Injectable()
export class BillPaymentService {
    constructor(
        @InjectModel(BillPayment.name)
        private readonly billsModel: Model<BillPayment>,
        @InjectModel(Transactions.name)
        private readonly transactionsModel: Model<Transactions>,
        private readonly accountsService: AccountsService
    ) { }

    async createBillPayment(body: CreateBillPaymentDto, userId: string) {

        const account = await this.accountsService.findByAccountNumber(body.accountNumber);

        if (!account) {
            throw new NotFoundException("Account not found")
        }

        if (account.userId !== userId) {
            throw new ForbiddenException("cannot Pay bill from another user's account");
        }

        if (account.isFrozen) {
            throw new BadRequestException("Cannot pay bill from a frozen account")
        }

        // 4. Validate amount
        if (!Number.isFinite(body.amount) || body.amount <= 0) {
            throw new BadRequestException(
                "Amount must be greater than 0",
            );
        }

        if (account.balance < body.amount) {
            throw new BadRequestException("Insufficient balance");
        }

        // 6. Debit account
        const updatedAccount =
            await this.accountsService.debitAccount(
                account.id,
                body.amount,
            );


        if (!updatedAccount) {
            throw new BadRequestException(
                "Unable to debit account",
            );
        }


        // 7. Generate payment reference
        const refNumber = `BILL-${randomUUID()}`;

        // 8. Save bill payment record
        const payment = await this.billsModel.create({
            userId,
            billerCode: body.billerCode,
            consumerNumber: body.consumerNumber,
            amount: body.amount,
            status: "SUCCESS",
            refNumber,
        });

        // 9. Save transaction history
        await this.transactionsModel.create({
            userId,
            accountId: account.id,
            type: "debit",
            amount: body.amount,
            balanceAfter: updatedAccount.balance,
            description: `Bill payment - ${body.billerCode}`,
            category: "bill-payment",
            referenceNumber: refNumber,
        });


        return {
            message: "Bill payment processed",
            refNumber,
            payment,
        };

    }

    async getMyBillPayments(userId: string) {
        return this.billsModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .exec();
    }
}

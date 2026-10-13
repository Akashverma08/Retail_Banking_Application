
import { IsString, IsNotEmpty, IsNumber, Min, } from "class-validator";
import { Type } from "class-transformer";

export class CreateBillPaymentDto {
    @IsString()
    @IsNotEmpty()
    billerCode: string;

    @IsString()
    @IsNotEmpty()
    consumerNumber: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    amount: number;

    @IsString()
    @IsNotEmpty()
    accountNumber: string;
}

import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateTransactionsDTO {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
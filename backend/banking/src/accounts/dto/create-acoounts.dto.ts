
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @IsNotEmpty()
  userId:string;


  @IsEnum(['Savings', 'Current'])
  type: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsNumber()
  @Min(0)
  dailyLimit: number;
}

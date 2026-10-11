
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  Length,
} from 'class-validator';

export class CreatePayeeDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{9,18}$/, {
    message: 'Account number must contain 9 to 18 digits',
  })
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: 'Please provide a valid IFSC code',
  })
  ifsc: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  nickname?: string;
}

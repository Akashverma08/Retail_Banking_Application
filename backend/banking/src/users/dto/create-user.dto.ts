import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['Customer', 'Admin'])
  role: string;
}
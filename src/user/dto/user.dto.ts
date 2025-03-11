import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,50}$/;

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4, { message: 'Name must have atleast 4 characters.' })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}

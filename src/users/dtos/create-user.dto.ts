import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstname: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastname?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;


  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}

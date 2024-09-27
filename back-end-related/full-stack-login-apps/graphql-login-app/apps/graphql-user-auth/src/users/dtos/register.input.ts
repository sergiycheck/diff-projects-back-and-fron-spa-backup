import { InputType } from '@nestjs/graphql';
import { MinLength, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @MinLength(3)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;
}

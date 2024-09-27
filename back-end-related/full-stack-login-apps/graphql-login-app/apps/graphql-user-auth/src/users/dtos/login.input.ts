import { InputType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @MinLength(3)
  @MaxLength(50)
  password: string;
}

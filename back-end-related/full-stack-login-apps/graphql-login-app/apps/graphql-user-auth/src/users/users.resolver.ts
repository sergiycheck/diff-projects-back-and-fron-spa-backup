import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { GetUserInput } from 'src/users/dtos/get-user.input';
import { LoginUserInput } from 'src/users/dtos/login.input';
import { RegisterUserInput } from 'src/users/dtos/register.input';
import { Public } from 'src/auth/metadata.decorators';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('getUser')
  async getUser(@Args('getUserInput') input: GetUserInput) {
    return this.usersService.findUser(input);
  }

  @Public()
  @Mutation('registerUser')
  async registerUser(@Args('registerUserInput') input: RegisterUserInput) {
    return this.usersService.registerUser(input);
  }

  @Public()
  @Mutation('loginUser')
  async loginUser(@Args('loginUserInput') input: LoginUserInput) {
    return this.usersService.loginUser(input);
  }
}

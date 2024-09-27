import { UserMapper } from './user.mapper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserInput } from './dtos/get-user.input';
import { RegisterUserInput } from './dtos/register.input';
import { LoginUserInput } from './dtos/login.input';
import { ConnectionService } from 'src/drizzle/connection.service';
import { users } from 'src/drizzle/schema';
import { hash, verify } from 'argon2';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly userMapper: UserMapper,
    private readonly authService: AuthService,
  ) {}

  findUserById(id: number) {
    const db = this.connectionService.db;

    return db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }

  findUserByEmail(email: string) {
    const db = this.connectionService.db;

    return db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }

  findUserByName(name: string) {
    const db = this.connectionService.db;

    return db.query.users.findFirst({
      where: (user, { eq }) => eq(user.name, name),
    });
  }

  async findUser(userInput: GetUserInput) {
    const userResponse = [];

    if (userInput.id) {
      userResponse.push(await this.findUserById(userInput.id));
    } else if (userInput.email) {
      userResponse.push(await this.findUserByEmail(userInput.email));
    } else if (userInput.name) {
      userResponse.push(await this.findUserByName(userInput.name));
    }

    const [user] = userResponse;

    return user ? this.userMapper.toUserResponse(user) : null;
  }

  async registerUser(userInput: RegisterUserInput) {
    const db = this.connectionService.db;

    let userExists = await this.findUser({ email: userInput.email });
    if (userExists) {
      return new BadRequestException(
        `User with email ${userInput.email} already exists`,
      );
    }
    userExists = await this.findUser({ name: userInput.name });
    if (userExists) {
      return new BadRequestException(
        `User with name ${userInput.name} already exists`,
      );
    }

    const hashedPassword = await hash(userInput.password);

    const [user] = await db
      .insert(users)
      .values({
        name: userInput.name,
        email: userInput.email,
        hashedPassword,
      })
      .returning();

    const accessToken = this.authService.getSignedAccessToken({
      email: user.email,
    });

    await this.authService.createAuthInfo({
      accessToken,
      userId: user.id,
    });

    return this.userMapper.toUserLoginResponse(user, accessToken);
  }

  async loginUser(userInput: LoginUserInput) {
    const db = this.connectionService.db;

    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, userInput.email),
    });

    if (!user) {
      return new BadRequestException(
        `User with email ${userInput.email} not found`,
      );
    }

    const isPasswordValid = await verify(
      user.hashedPassword,
      userInput.password,
    );

    if (!isPasswordValid) {
      return new BadRequestException(`Password is invalid`);
    }

    const accessToken = this.authService.getSignedAccessToken({
      email: user.email,
    });

    await this.authService.createAuthInfo({
      accessToken,
      userId: user.id,
    });

    return this.userMapper.toUserLoginResponse(user, accessToken);
  }
}

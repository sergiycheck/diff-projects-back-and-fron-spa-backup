import { Injectable } from '@nestjs/common';
import { UserModel } from './models';
import { UserResponse } from './dtos/responses';

@Injectable()
export class UserMapper {
  toUserResponse(user: UserModel): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  toUserLoginResponse(user: UserModel, accessToken: string) {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
      },
      authInfo: {
        accessToken,
      },
    };
  }
}

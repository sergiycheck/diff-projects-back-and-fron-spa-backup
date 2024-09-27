import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash } from 'argon2';
import { Payload } from './guards-strategies/types';
import { CreateAuthInfo } from './dtos';
import { ConnectionService } from 'src/drizzle/connection.service';
import { authInfo } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private connectionService: ConnectionService,
  ) {}

  getSignedAccessToken(payload: Payload) {
    return this.jwtService.sign(payload);
  }

  async createAuthInfo(dto: CreateAuthInfo) {
    const db = this.connectionService.db;

    const hashedAccessToken = await hash(dto.accessToken);

    const authInfoExists = await db.query.authInfo.findFirst({
      where: (authInfo, { eq }) => eq(authInfo.userId, dto.userId),
    });

    let res:
      | {
          id: number;
          userId: number;
          hashedAccessToken: string;
        }[]
      | undefined;

    if (!authInfoExists) {
      res = await db
        .insert(authInfo)
        .values({
          userId: dto.userId,
          hashedAccessToken,
        })
        .returning();
    } else {
      res = await db
        .update(authInfo)
        .set({
          hashedAccessToken,
        })
        .where(eq(authInfo.userId, dto.userId))
        .returning();
    }

    return res;
  }

  async removeAuthInfo({ userId }: { userId: number }) {
    const db = this.connectionService.db;

    const res = await db
      .delete(authInfo)
      .where(eq(authInfo.userId, userId))
      .returning();

    return res;
  }
}

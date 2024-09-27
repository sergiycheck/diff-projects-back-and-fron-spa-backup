import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('auth')
export class AuthController {
  @Get('id')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    return { userId };
  }
}

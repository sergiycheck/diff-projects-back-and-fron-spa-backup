import { Module, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserMapper } from './user.mapper';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AuthModule)],
  providers: [UsersResolver, UsersService, UserMapper],
  exports: [UsersService],
})
export class UsersModule {}

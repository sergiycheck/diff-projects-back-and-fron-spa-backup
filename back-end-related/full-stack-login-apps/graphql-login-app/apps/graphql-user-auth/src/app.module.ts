import { ComplexityPlugin } from './common/plugins/complexity';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { LogErrOnFailure } from './common/plugins/log-err-on-failure';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),

        PORT: Joi.number().default(3000),
        // pg related
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        // auth related
        PRIVATE_JWT_KEY: Joi.string().required(),
        JWT_EXPIRES_SECONDS: Joi.string().required(),
      }),
    }),

    DrizzleModule,
    UsersModule,
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.{gql,graphql}'],
      playground: false,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },

      plugins: [ApolloServerPluginLandingPageLocalDefault(), LogErrOnFailure],
      subscriptions: {
        'subscriptions-transport-ws': true,
        'graphql-ws': true,
      },
    }),
  ],
  controllers: [],
  providers: [ComplexityPlugin],
})
export class AppModule {}

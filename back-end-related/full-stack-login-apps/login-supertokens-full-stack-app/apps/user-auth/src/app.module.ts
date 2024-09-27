import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI:
        'https://st-dev-43c25af0-6dab-11ee-84b3-711365a8366c.aws.supertokens.io',
      apiKey: 'dwZS3nbXX2fpA82HIIP=t4=Jjj',
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartypasswordless/appinfo
        appName: 'user-auth',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3030',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

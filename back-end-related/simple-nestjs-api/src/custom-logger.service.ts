import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.DEFAULT })
export class CustomLogger extends ConsoleLogger {
  constructor(private configService: ConfigService) {
    super();
  }
}

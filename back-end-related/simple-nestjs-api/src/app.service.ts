import { Injectable } from '@nestjs/common';
import { DataDto } from './dtos.dto';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello World!' };
  }

  returnSimpleDataDto(dto: DataDto) {
    return dto;
  }
}

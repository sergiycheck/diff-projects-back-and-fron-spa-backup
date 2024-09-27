import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DataDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  data1: string;
}

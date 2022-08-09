import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  readonly username: string;
  readonly password?: string;
  readonly key: string;
}

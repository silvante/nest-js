import { IsString } from 'class-validator';

export class RegiatrateUserDto {
  @IsString()
  email: string;
}

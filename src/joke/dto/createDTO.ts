import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  funny: number;
  notfunny: number;
}

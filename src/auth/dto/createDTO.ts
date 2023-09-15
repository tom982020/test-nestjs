import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
}

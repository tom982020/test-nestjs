import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDTO } from './dto/createDTO';
import { SignInDTO } from './dto/signInDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getHello();
  }

  @Post()
  create(@Body() request: CreateDTO) {
    return this.authService.create(request);
  }

  @Post('/login')
  login(@Body() request: SignInDTO) {
    return this.authService.signin(request);
  }
}

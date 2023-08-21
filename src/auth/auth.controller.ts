import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createSignup(@Body() createAuthDto: CreateAuthDto) {
    if (
      createAuthDto.login === 'string' ||
      createAuthDto.password === 'string' ||
      typeof createAuthDto.login === 'string' ||
      typeof createAuthDto.password === 'string'
    ) {
      throw new BadRequestException();
    } else {
      return this.authService.createSignup(createAuthDto);
    }
  }

  @Post('login')
  createLogin() {
    return this.authService.createLogin();
  }
  @Post('refresh')
  createRefresh() {
    return this.authService.createRefresh();
  }
}

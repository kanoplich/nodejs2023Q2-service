import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async createSignup(createAuthDto: CreateAuthDto) {
    return await this.userService.create(createAuthDto);
  }

  createLogin() {
    return 'This action adds a new auth';
  }

  createRefresh() {
    return 'This action adds a new auth';
  }
}

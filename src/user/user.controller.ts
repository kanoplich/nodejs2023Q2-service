import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException();
    } else {
      return await this.userService.create(createUserDto);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.userService.findOne(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.update(uuid, updateUserDto);
    } catch (e) {
      if (e.message === 'oldPassword is wrong') {
        throw new ForbiddenException({ statusCode: 403, message: e.message });
      } else if (e.message === 'Bad request') {
        throw new BadRequestException();
      } else {
        throw new NotFoundException();
      }
    }
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.userService.remove(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}

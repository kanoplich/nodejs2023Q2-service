import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdAt = +new Date();
    const user = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };

    const createdUser = this.usersRepository.create(user);

    return await this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) return user;

    throw new Error();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.oldPassword || !updateUserDto.newPassword) {
      throw new Error('Bad request');
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      if (updateUserDto.oldPassword === user.password) {
        const updateUser = {
          ...user,
          password: updateUserDto.newPassword,
          version: user.version + 1,
          updatedAt: +new Date(),
        };

        return await this.usersRepository.save(updateUser);
      } else {
        throw new Error('oldPassword is wrong');
      }
    } else {
      throw new Error();
    }
  }

  async remove(id: string): Promise<void> {
    const remove = await this.usersRepository.delete(id);
    if (remove.affected === 0) throw new Error();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const createdAt = +new Date();
    const user = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };

    this.users.push(user);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  findAll(): User[] {
    const users = this.users.map((user) => {
      const { password, ...items } = user;
      return items;
    });
    return users;
  }

  findOne(id: string) {
    const { password, ...user } = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error();
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.oldPassword || !updateUserDto.newPassword) {
      throw new Error('Bad request');
    }
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      if (updateUserDto.oldPassword === this.users[userIndex].password) {
        const user = {
          ...this.users[userIndex],
          password: updateUserDto.newPassword,
          version: this.users[userIndex].version + 1,
          updatedAt: +new Date(),
        };

        this.users.splice(userIndex, 1, user);

        return {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } else {
        throw new Error('oldPassword is wrong');
      }
    } else {
      throw new Error();
    }
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }
}

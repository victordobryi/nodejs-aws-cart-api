import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async findOne(name: string) {
    try {
      const user = await this.users.findOne({
        where: { name },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createOne({ name, password }: User) {
    const id = v4();
    const newUser = { id, name, password };
    await this.users.save(newUser);
    return newUser;
  }
}

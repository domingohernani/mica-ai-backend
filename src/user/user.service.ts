import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import now from '../utils/dates/now';
import { User } from './entities/user.entity';
import { CreateUserDto } from './schemas/create-user.schema';

@Injectable()
export class UserService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(User) private readonly user: MongoRepository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    // Check fisrt if already exist
    const user: User | null = await this.user.findOne({
      where: { email: userDto.email },
    });

    // Return if the user already signed up
    if (user) return user;

    // Adding createdAt and updatedAt properties
    const newUserDto: User = {
      ...userDto,
      createdAt: now(),
      updatedAt: now(),
    };

    const newUser: User = this.user.create(newUserDto);
    // Return and save into the database
    return await this.user.save(newUser);
  }
}

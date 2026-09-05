import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User | null> | null {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // this line is only to make using entity object instead of passing normal object to save method,
    // because save method will not update the entity if it is not an entity object
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}

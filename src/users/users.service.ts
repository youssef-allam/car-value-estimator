import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity.ts/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.repo.create(createUserDto);
        return this.repo.save(user);
    }
}

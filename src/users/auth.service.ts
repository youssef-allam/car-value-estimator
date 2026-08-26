import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(email: string, password: string) {
    //search for existing user with the same email
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('Email already in use');
    }

    //generate salt
    const salt = randomBytes(8).toString('hex');

    //hashing the password
    const hashedPassword = (await scryptAsync(password, salt, 32)) as Buffer;
    //combining salt with the hashedPassword
    const res = salt + '.' + hashedPassword.toString('hex');
    //create new User
    const createdUser = await this.userService.createUser({
      email,
      password: res,
    });

    return createdUser;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new BadRequestException('User no found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scryptAsync(password, salt, 32)) as Buffer;

    if (storedHash != hash.toString('hex'))
      throw new BadRequestException('passowrd or email is worng');


    return user;
  }
}

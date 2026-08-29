import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity.ts/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      createUser: ({ email, password }: CreateUserDto) => {
        const user = { id: Math.floor(Math.random() * 99999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instanse of Auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates a user with salted & hashed password', async () => {
    const user = await service.signup('dflska@gmail.com', 'fdsfd');

    expect(user.password).not.toEqual('fdsfd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if signed up with email already in use ', async () => {
    await service.signup('a@gmail.com', 'a');
    await expect(service.signup('a@gmail.com', 'a')).rejects.toThrow();
  });

  it('throws an error if signed in with email that doesnt exist ', async () => {
    await expect(service.signIn('email', 'password')).rejects.toThrow();
  });

  it('matches the correct password', async () => {
    const userSignUP = await service.signup('dflska@gmail.com', 'fdsfd');

    const userSignIn = await service.signIn('dflska@gmail.com', 'fdsfd');

    expect(userSignIn).toEqual(userSignUP);
  });

  it('throws error if password incorrect', async () => {
    const userSignUP = await service.signup('dflska@gmail.com', 'fdsfd');

    await expect(service.signIn('dflska@gmail.com', 'fdfd')).rejects.toThrow();
  });
});

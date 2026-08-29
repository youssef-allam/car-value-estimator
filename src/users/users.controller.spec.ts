import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity.ts/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let faskeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'a@gmail.com',
          password: 'a',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([ { id: Math.floor(Math.random() * 99999), email, password:'a' } as User]);
      },
      // remove: () => {},
      // update: () => {},
      // createUser: () => {},
    };

    faskeAuthService = {
      // signup: () => {},
      // signIn: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide:UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: faskeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("gets User by id",async ()=>{
    const user = await controller.getUser(1);

    expect(user).toBeDefined();
  })

  it("throws an err if user Not found",async ()=>{
    fakeUsersService.findOne = (id:number) => null;

    await expect(controller.getUser(1)).rejects.toThrow();
  })

  it("getUsers returns all users with current email",async ()=>{
    const user = await controller.getUsers("g@gmail.com");

    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual("g@gmail.com");
  })

});

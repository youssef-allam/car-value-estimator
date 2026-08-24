import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log('Received user data:', createUserDto);
        return this.userService.createUser(createUserDto);
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Get()
    getUsers(@Param('email') email: string) {
        return this.userService.find(email);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() attrs: Partial<CreateUserDto>) {
        return this.userService.update(id, attrs);
    }

    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}

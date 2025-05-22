import { User } from '@entities/user.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from '@services/user/user.service';
import { UserDTO } from 'src/models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) { }


    @Get('all')
    public async getAllLocation(): Promise<UserDTO[]> {
        try {
            return await this._userService.getAll();
        } catch (error) {
            throw new Error('User not found')
        }
    }

    @Get('name')
    public async getName(@Query('name') name: string): Promise<UserDTO> {
        try {
            console.log(name)
            return await this._userService.getByName(name)
        } catch (error) {
            throw new Error('User not found')
        }
    }

    @Get()
    public async getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this._userService.getUsers(page, limit);
    }

    @Post('add-user')
    public async post(@Body() data: UserDTO) {
        return await this._userService.addUser(data)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: User) {
        return this._userService.update(id, data);
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: number): Promise<void> {
        const user = await this._userService.removeId(id)
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
    }
}



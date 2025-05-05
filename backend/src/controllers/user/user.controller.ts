import { Controller, Get, Query } from '@nestjs/common';
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
}

import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@services/auth/auth.service';
import { Response } from 'express';
import { UserDTO } from 'src/models/user.model';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() user: UserDTO): Promise<UserDTO> {
        return this.authService.register(user)
    }

    @Post('login')
    async login(@Body() user: UserDTO, @Res({ passthrough: true }) res: Response): Promise<{ result: string }> {
        const { accessToken } = await this.authService.login(user);
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { result: 'Login successful' };
    }
}

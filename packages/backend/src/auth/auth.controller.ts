import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '@dto/user.dto';

interface token {
    token: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() userDto: UserDto) {
        const user = await this.authService.validateUser(userDto);
        return this.authService.login(user)
    } 

    @Post('refresh')
    async refreshToken(@Body() refreshToken: token, @Res() res: Response): Promise<any> {
        await this.authService.refreshToken(refreshToken.token); 
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '@dto/user.dto';
import { JwtAuthGuard } from '../guard/auth.guard';
import { UseGuards } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    async refreshToken(@Body() refreshToken: token): Promise<any> {
        const tokens = await this.authService.refreshToken(refreshToken.token); 
        return tokens
    }
}

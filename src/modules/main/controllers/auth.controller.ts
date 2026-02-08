import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/user/auth.dto';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/decorators/auth-guard.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post('/login')
    async login(@Body() data: LoginDTO) {
        return await this.authService.authenticate(data);
    }
}

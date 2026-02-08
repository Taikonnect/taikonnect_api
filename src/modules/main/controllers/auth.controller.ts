import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/user/auth.dto';
import { UserService } from '../services/auth.service';
import { Public } from 'src/decorators/auth-guard.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Public()
    @Post('/login')
    async login(@Body() data: LoginDTO) {
        return await this.userService.authenticate(data);
    }
}

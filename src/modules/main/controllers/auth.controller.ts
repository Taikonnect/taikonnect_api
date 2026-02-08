import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from '../dtos/user/auth.dto';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/decorators/auth-guard.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('/login')
    async login(@Body() data: LoginDTO) {
        return await this.authService.authenticate(data);
    }
}

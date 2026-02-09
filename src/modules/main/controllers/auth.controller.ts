import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDTO, LoginDTO, ResetPasswordDTO } from '../dtos/user/auth.dto';
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

    @Public()
    @ApiOperation({ summary: 'Esqueci minha senha' })
    @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 400, description: 'E-mail inválido' })
    @ApiResponse({ status: 401, description: 'Usuário não encontrado' })
    @Post('/reset-password')
    async resetPassword(@Body() data: ResetPasswordDTO) {
        return await this.authService.resetPassword(data);
    }

    @Public()
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('/validate-code')
    async validateCode(@Body() data: LoginDTO) {
        return await this.authService.authenticate(data);
    }

    @Public()
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('/change-password')
    async changePassword(@Body() data: LoginDTO) {
        return await this.authService.authenticate(data);
    }
}

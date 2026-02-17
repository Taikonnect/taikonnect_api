import { Body, Controller, Post, Get } from '@nestjs/common';
import { ChangePasswordDTO, CreateUserDTO, LoginDTO, ResetPasswordDTO, ValidateCodeDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
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
    @ApiResponse({ status: 201, description: 'E-mail de recuperação de senha enviado com sucesso' })
    @ApiResponse({ status: 400, description: 'E-mail inválido' })
    @ApiResponse({ status: 401, description: 'Usuário não encontrado' })
    @Post('/reset-password')
    async resetPassword(@Body() data: ResetPasswordDTO) {
        return await this.authService.resetPassword(data);
    }

    @Public()
    @ApiOperation({ summary: 'Validação de código de recuperação de senha' })
    @ApiResponse({ status: 201, description: 'Código válido' })
    @ApiResponse({ status: 401, description: 'Código expirado' })
    @ApiResponse({ status: 404, description: 'Código inválido' })
    @Post('/validate-code')
    async validateCode(@Body() data: ValidateCodeDTO) {
        return await this.authService.validateCode(data);
    }

    @Public()
    @ApiOperation({ summary: 'Alteração de senha' })
    @ApiResponse({ status: 201, description: 'Senha atualizada com sucesso' })
    @ApiResponse({ status: 401, description: 'Falha ao alterar senha' })
    @Post('/change-password')
    async changePassword(@Body() data: ChangePasswordDTO) {
        return await this.authService.changePassword(data);
    }
}

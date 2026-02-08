import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserService } from '../services/user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from '../dtos/user/auth.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Public()
    @ApiOperation({ summary: 'Criar usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('/create')
    async create(@Body() data: CreateUserDTO) {
        return await this.userService.create(data);
    }
}

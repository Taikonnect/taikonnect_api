import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckPermissionDTO, CreateUserDTO } from '../Auth/dto/auth.dto';
import Mail from 'nodemailer/lib/mailer';
import { MailService } from 'src/external/mailer/mail.service';

@ApiTags('Usuários')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) { }

    @Public()
    @ApiOperation({ summary: 'Criar usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 409, description: 'Usuário já cadastrado' })
    @Post('/create')
    async create(@Body() data: CreateUserDTO) {
        return await this.userService.create(data);
    }

    @Get('/check-permission')
    async checkPermission(@Query() data: CheckPermissionDTO) {
        return await this.userService.checkPermission(data);
    }

    @ApiOperation({ summary: 'Paginação de usuário' })
    @Get('/combolist')
    async combolist() {
        return await this.userService.combolist();
    }
}

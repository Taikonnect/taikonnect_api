import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CheckPermissionDTO, CreateUserDTO, ListDTO, UpdateUserDTO } from '../auth/dto/auth.dto';
import { MailService } from 'src/external/mailer/mail.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { User } from 'src/decorators/user.decorator';
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

    @ApiOperation({ summary: 'Listagem de usuário' })
    @Get('/list')
    async ListUsers(@Query() data: ListDTO) {
        return await this.userService.ListUsers(data);
    }

    @ApiOperation({ summary: 'Listagem de permissões' })
    @Get('/list-permissions')
    async ListPermissions() {
        return await this.userService.ListPermissions();
    }

    @ApiOperation({ summary: 'Detalhar usuário' })
    @Get('/detail/:id')
    async detail(@Param('id') id: string) {
        return await this.userService.detail(id);
    }


    @ApiOperation({ summary: 'Atualizar usuário' })
    @ApiConsumes('multipart/form-data')
    @Post('/update')
    @UseInterceptors(AnyFilesInterceptor())
    async update(
        @Body() data: UpdateUserDTO,
        @UploadedFiles() files: any[]
    ) {
        return await this.userService.update(data, files);
    }

    @ApiOperation({ summary: 'Atualizar permissões do perfil' })
    @Post('/update-permissions')
    async updatePermissions(
        @Body() data: { profile: string, permissions: string[] },
    ) {
        return await this.userService.updatePermissions(data);
    }

}

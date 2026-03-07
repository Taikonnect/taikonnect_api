import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CheckPermissionDTO, CreateUserDTO, ListDTO, UpdateUserDTO } from '../Auth/dto/auth.dto';
import Mail from 'nodemailer/lib/mailer';
import { MailService } from 'src/external/mailer/mail.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
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
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: (req, file, callback) => {

                const userId = req.body.id;
                let path = '';

                if (file.fieldname === 'profile-avatar') {
                    path = `./storage/avatar/${userId}`;
                }

                if (file.fieldname.startsWith('emergency-contacts-avatar')) {
                    path = `./storage/emergency-contacts/${userId}`;
                }

                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path, { recursive: true });
                }

                callback(null, path);
            },

            filename: (req, file, callback) => {

                if (file.fieldname === 'profile-avatar') {
                    const fileName = `avatar${extname(file.originalname)}`;
                    return callback(null, fileName);
                }

                if (file.fieldname.startsWith('emergency-contacts-avatar')) {

                    const userId = req.body.id;
                    const folder = `./storage/emergency-contacts/${userId}`;

                    const files = fs.existsSync(folder) ? fs.readdirSync(folder) : [];

                    const contactFiles = files.filter(f => f.startsWith('contact_'));

                    const nextIndex = contactFiles.length + 1;

                    const fileName = `contact_${nextIndex}${extname(file.originalname)}`;

                    return callback(null, fileName);
                }

                callback(null, file.originalname);
            }
        })
    }))
    async update(
        @Body() data: UpdateUserDTO,
        @UploadedFiles() files: Multer.File[]
    ) {
        return await this.userService.update(data, files);
    }

}

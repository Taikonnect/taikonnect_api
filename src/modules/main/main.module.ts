import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './controllers/user.controller';
import { TeamController } from './controllers/team.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/auth.service';

@Module({
    controllers: [
        UserController,
        TeamController,
        AuthController
    ],
    providers: [
        PrismaService, 
        MailService,
        UserService
    ]
})
export class MainModule { }

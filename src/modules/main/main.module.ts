import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './controllers/user.controller';
import { TeamController } from './controllers/team.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { TeamService } from './services/team.service';

@Module({
    controllers: [
        UserController,
        TeamController,
        AuthController
    ],
    providers: [
        PrismaService, 
        MailService,
        AuthService,
        UserService,
        TeamService
    ]
})
export class MainModule { }

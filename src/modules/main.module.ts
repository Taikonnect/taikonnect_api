import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './User/user.controller';
import { TeamController } from './Team/team.controller';
import { AuthController } from './Auth/auth.controller';
import { UserService } from './User/user.service';
import { AuthService } from './Auth/auth.service';
import { TeamService } from './Team/team.service';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';
import { ProfileHandler } from 'src/shared/handlers/profile.handler';

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
        TeamService,
        BooleanHandlerService,
        ProfileHandler
    ]
})
export class MainModule { }

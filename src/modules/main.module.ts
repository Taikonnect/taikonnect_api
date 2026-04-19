import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './user/user.controller';
import { TeamController } from './team/team.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { TeamService } from './team/team.service';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';
import { ProfileHandler } from 'src/shared/handlers/profile.handler';
import { StorageHandler } from 'src/shared/handlers/storage.handler';

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
        ProfileHandler,
        StorageHandler
    ]
})
export class MainModule { }

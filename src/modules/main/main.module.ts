import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './controllers/user.controller';
import { TeamController } from './controllers/team.controller';

@Module({
    controllers: [
        UserController,
        TeamController
    ],
    providers: [
        PrismaService, 
        MailService,
    ]
})
export class MainModule { }

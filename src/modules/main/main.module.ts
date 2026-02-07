import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { UserController } from './controllers/user.controller';

@Module({
    controllers: [
        UserController
    ],
    providers: [
        PrismaService, 
        MailService,
    ]
})
export class MainModule { }

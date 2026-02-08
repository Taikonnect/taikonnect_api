import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './api/mailer/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { MainModule } from './modules/main/main.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'noreplycooperflow@gmail.com',
          pass: 'aeduzxgkjhlunmne'
        }
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MainModule
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule { }

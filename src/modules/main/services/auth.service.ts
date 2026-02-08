import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/external/mailer/mail.service';
import { LoginDTO } from '../dtos/user/auth.dto';
import { jwt } from 'src/configs/env';


@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private _mailService: MailService
    ) { }

    async exists(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });

        return !!user;
    }

    async buildAvatar() {
        const baseURL = process.env.BASE_URL;
        
        return `${baseURL}/img/user.jpg`
    }

    async authenticate(data: LoginDTO) {

        const email = data.email;

        if (!(await this.exists(email))) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
                is_active: true
            },
            select: {
                id: true,
                sys_admin: true,
                name: true,
                email: true,
                nickname: true,
                password: true,
                account_stage: true,
                language: true,
                theme: true,
            },
        });

        if (!user.password) {
            throw new UnauthorizedException(
                'Por favor, defina sua senha de primeiro acesso',
            );
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            // throw new UnauthorizedException('Invalid credentials');
            throw new UnauthorizedException(
                'Credenciais inválidas',
            );
        }

        const payload = {
            id: user.id,
            sys_admin: user.sys_admin,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            account_stage: user.account_stage,
            language: user.language,
            theme: user.theme,
            group_name: 'Wakaba Taiko',
            avatar: this.buildAvatar()
        };

        const today = new Date();

        today.setDate(today.getDate() + Number(jwt.auth.expiresIn))

        const token = await this.jwtService.signAsync(payload, {
            secret: jwt.auth.secret,
            expiresIn: jwt.auth.expiresIn,
        });

        const response = {
            access_token: token,
            user: payload,
            expires_in: today
        };

        return {
            status: true,
            message: 'Usuário logado com sucesso',
            ...response
        };
    }

}

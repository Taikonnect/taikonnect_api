import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/external/mailer/mail.service';
import { ChangePasswordDTO, LoginDTO, ResetPasswordDTO, ValidateCodeDTO } from './dto/auth.dto';
import { jwt } from 'src/configs/env';
import { PasswordChange } from '@prisma/client';
import { randomBytes } from 'crypto';
import { ProductMainName } from 'src/shared/constants/project.params';


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
            name: user.nickname ?? this.getFirstName(user.name),
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


    async resetPassword(data: ResetPasswordDTO) {
        const email = data.email ?? null;

        if (!email) {
            throw new BadRequestException('E-mail inválido');
        }

        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user || !user.is_active) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const token = randomBytes(32).toString('hex');

        const code = await this.generateUniqueCode();

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);

        const passwordChange = await this.prismaService.passwordChange.create({
            data: {
                user_id: user.id,
                token,
                code,
                expires_at: expiresAt,
            },
        });

        await this._mailService.ResetPassword({
            to: user.email,
            name: user.name,
            code: passwordChange.code,
            token: passwordChange.token,
            subject: `Redefinição de senha - ${ProductMainName}`,
            text: ' '
        });

        return {
            status: true,
            message: 'Código de redefinição de senha enviado com sucesso',
        };
    }

    public generateCode(length = 5) {
        const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    private async generateUniqueCode(): Promise<string> {
        let code: string;
        let exists = true;

        while (exists) {
            code = this.generateCode(5);
            const existing = await this.prismaService.passwordChange.findFirst({
                where: { code },
            });
            if (!existing) exists = false;
        }

        return code;
    }

    async createCode(user_id: string, token: string, expires_at: Date): Promise<PasswordChange> {
        const code = await this.generateUniqueCode();

        return this.prismaService.passwordChange.create({
            data: {
                user_id,
                token,
                code,
                expires_at,
            },
        });
    }

    public getFirstName(fullName: string): string {
        if (!fullName) return '';

        return fullName.trim().split(/\s+/)[0];
    }

    async validateCode(data: ValidateCodeDTO) {

        const email = data.email;
        const code = data.code;
        const now = new Date();

        const codeGenerated = await this.prismaService.passwordChange.findFirst({
            where: {
                code: code
            }
        });

        if (!codeGenerated) throw new NotFoundException('Código não encontrado');

        const user = await this.prismaService.user.findUnique({
            where: {
                id: codeGenerated.user_id
            }
        })

        if (now > codeGenerated.expires_at) throw new UnauthorizedException('Código expirado');

        if (email !== user.email) throw new UnauthorizedException('Código inválido');

        return codeGenerated;
    }

    async changePassword(data: ChangePasswordDTO) {

        const codeGenerated = await this.prismaService.passwordChange.findUnique({
            where: {
                id: data.id
            }
        });

        if (!codeGenerated){
            console.log('Código não encontrado')
            throw new NotFoundException('Falha ao alterar senha')
        };

        if (codeGenerated.token !== data.token) {
            console.log('Token inválido')
            throw new NotFoundException('Falha ao alterar senha')
        };

        const password = await bcrypt.hash(data.password, 10);
        
        const user = await this.prismaService.user.update({
            where: {
                id: codeGenerated.user_id
            },
            data: {
                password: password
            }
        })

        return {
            message: 'Senha alterada com sucesso',
            email: user.email,
            name: user.name
        }

    }

}


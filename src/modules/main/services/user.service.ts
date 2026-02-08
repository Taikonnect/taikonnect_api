import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDTO } from '../dtos/user/auth.dto';
import * as bcrypt from 'bcryptjs'
import { AccountStatus } from 'src/shared/constants/account-status.enum';


@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async create(data: CreateUserDTO) {

        const exists = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if(exists) {
            throw new ConflictException('Usuário já cadastrado') 
        }

        const password = await bcrypt.hash(data.password, 10);

        const newUser = await this.prismaService.user.create({
            data: {
                is_active: true,
                sys_admin: false,
                name: data.name,
                email: data.email,
                nickname: data.nickname,
                password: password,
                birth_date: new Date(),
                rg: '',
                cpf: '',
                phone: '',
                address: '',
                account_stage: AccountStatus.accept_pending,
                language: data.language,
                theme: data.theme,
                group_id: data.group_id
            }
        });

        return {
            data: newUser,
            message: 'Usuário criado com sucesso'
        }

    }
}

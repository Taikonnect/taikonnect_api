import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CheckPermissionDTO, CreateUserDTO, ListDTO } from '../Auth/dto/auth.dto';
import * as bcrypt from 'bcryptjs'
import { AccountStatus } from 'src/shared/constants/account-status.enum';
import { PermissionType, ProfileType } from 'src/shared/constants/profile.enum';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';


@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly booleanHandleService: BooleanHandlerService,
    ) { }

    async create(data: CreateUserDTO) {

        const exists = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (exists) {
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
                account_stage: AccountStatus.pending,
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

    async checkPermission(data: CheckPermissionDTO) {

        const AdminRule = [
            PermissionType.A01,
            PermissionType.F01,
            PermissionType.P01,
            PermissionType.E01,
            PermissionType.R01
        ]

        const FinancialRule = [
            PermissionType.F01,
        ]

        const ModeratorRule = [
            PermissionType.P01,
            PermissionType.E01,
            PermissionType.R01
        ]
        const user = await this.prismaService.user.findUnique({
            where: {
                id: data.user_id,
            },
        });

        if (user.sys_admin) return {
            hasPermission: true,
            sys_admin: true
        }

        const permissions = await this.prismaService.permissionUser.findMany({
            where: {
                user_id: data.user_id,
            },
        });

        if (!permissions) return {
            hasPermission: false,
            sys_admin: user.sys_admin
        }

        let profileList = [];

        permissions.map((permission) => {
            switch (permission.profile) {
                case ProfileType.Admin:
                    profileList = [...profileList, ...AdminRule]
                    break;
                case ProfileType.Financial:
                    profileList = [...profileList, ...FinancialRule]
                    break;
                case ProfileType.Moderator:
                    profileList = [...profileList, ...ModeratorRule]
                    break;
                default:
                    break;
            }
        })

        if (profileList.includes(data.permission)) {
            return {
                hasPermission: true,
                sys_admin: user.sys_admin,
            }
        }
        else {
            return {
                hasPermission: false,
                sys_admin: user.sys_admin
            }
        }

    }

    async ListUsers(data: ListDTO) {

        const active = await this.booleanHandleService.convert(data.is_active);

        const where: any = {
            is_active: active,
            account_stage: {
                not: AccountStatus.pending
            }
        };

        console.log(active)

        if (data.name) {
            where.name = {
                contains: data.name,
                mode: 'insensitive'
            };
        }

        if (data.permission) {
            where.permission = data.permission;
        }

        const users = await this.prismaService.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
                is_active: true,
                sys_admin: true,
                birth_date: true,
                rg: true,
                cpf: true,
                phone: true,
                address: true
            }
        });


        const counting = await this.prismaService.user.findMany({
            where: {
                account_stage: {
                    not: AccountStatus.pending
                }
            }
        })

        const inactiveUsers = counting.filter(user => user.is_active === false).length;
        const isActiveUsers = counting.filter(user => user.is_active === true).length;

        return {
            data: users,
            active: isActiveUsers,
            inactive: inactiveUsers,
            total: counting.length
        };
    }

    async ListPermissions() {

        const ProfileTypeList = [
            {
                label: 'Administrador',
                value: ProfileType.Admin,
            },
            {
                label: 'Moderador',
                value: ProfileType.Moderator,
            },
            {
                label: 'Financeiro',
                value: ProfileType.Financial,
            },
            {
                label: 'Membro',
                value: ProfileType.Member,
            }
        ]

        return ProfileTypeList;

    }
}

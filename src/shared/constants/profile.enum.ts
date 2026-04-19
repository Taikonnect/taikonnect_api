import { BadRequestException } from "@nestjs/common";

export enum ProfileType {
    Admin = 'admin',
    Moderator = 'moderator',
    Financial = 'financial',
    Member = 'member'
}

export const PROFILE_LABELS: Record<ProfileType, string> = {
    [ProfileType.Admin]: 'Administrador',
    [ProfileType.Moderator]: 'Moderador',
    [ProfileType.Financial]: 'Financeiro',
    [ProfileType.Member]: 'Membro',
};

export enum PermissionType {
    A01 = 'A01', //Acessar área de admin
    P01 = 'P01', //Gerenciar publicações
    E01 = 'E01', //Gerenciar eventos
    R01 = 'R01', //Gerenciar repertório
    F01 = 'F01', //Gerenciar financeiro
}

export const PERMISSION_DESCRIPTIONS: Record<PermissionType, string> = {
    [PermissionType.A01]: 'Acessar área de admin',
    [PermissionType.P01]: 'Gerenciar publicações',
    [PermissionType.E01]: 'Gerenciar eventos',
    [PermissionType.R01]: 'Gerenciar repertório',
    [PermissionType.F01]: 'Gerenciar financeiro',
};

export function getPermissionDescription(permission: string): string {
    const description = PERMISSION_DESCRIPTIONS[permission as PermissionType];

    if (!description) {
        throw new BadRequestException(`Permissão inválida: "${permission}"`);
    }

    return description;
}
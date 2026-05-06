import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ConflictException
} from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { LinkCategoryUsersDto } from './dto/link-category-user.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) { }

    async combolist() {
        try {
            return await this.prismaService.category.findMany({
                where: { is_active: true },
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao listar categorias');
        }
    }

    async create(data: CreateCategoryDto) {
        try {
            const group = await this.prismaService.group.findFirst({
                where: { shortname: 'wakaba' },
            });

            const category = await this.prismaService.category.create({
                data: {
                    name: data.name,
                    description: data.description,
                    is_active: true,
                    group_id: group?.id ?? null,
                },
            });

            return {
                message: 'Categoria criada com sucesso',
                data: category,
            };
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar categoria');
        }
    }

    async update(id: string, data: UpdateCategoryDto) {
        try {
            const group = await this.prismaService.group.findFirst({
                where: { shortname: 'wakaba' },
            });

            const category = await this.prismaService.category.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    is_active: true,
                    group_id: group?.id ?? null,
                },
            });

            return {
                message: 'Categoria atualizada com sucesso',
                data: category,
            };
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('Categoria não encontrada');
            throw new InternalServerErrorException('Erro ao atualizar categoria');
        }
    }

    async delete(id: string) {
        try {
            await this.prismaService.category.delete({
                where: { id },
            });

            return {
                message: 'Categoria deletada com sucesso',
            };
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('Categoria não encontrada');
            throw new InternalServerErrorException('Erro ao deletar categoria');
        }
    }


    async unlinkUser(user_id: string, category_id: string) {
        try {
            return await this.prismaService.categoryUser.delete({
                where: {
                    user_id_category_id: {
                        user_id,
                        category_id,
                    },
                },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Vínculo não encontrado');
            }
            throw new InternalServerErrorException('Erro ao remover vínculo');
        }
    }

    async listUsersByCategory(category_id: string) {
        try {
            return await this.prismaService.categoryUser.findMany({
                where: { category_id },
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            nickname: true,
                            is_active: true,
                        }
                    }
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar usuários da categoria');
        }
    }

    async listCategoriesByUser(user_id: string) {
        try {
            return await this.prismaService.categoryUser.findMany({
                where: { user_id },
                include: { Category: true },
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar categorias do usuário');
        }
    }

    async linkUsersToCategory(data: LinkCategoryUsersDto) {
        try {
            // Mapeia a lista de IDs de usuários para o formato do Prisma
            const relations = data.user_ids.map(userId => ({
                category_id: data.category_id,
                user_id: userId
            }));

            const result = await this.prismaService.categoryUser.createMany({
                data: relations,
                skipDuplicates: true, // Ignora se o usuário já estiver na categoria
            });

            return {
                message: `${result.count} usuários vinculados com sucesso`,
                data: result
            };
        } catch (error) {
            throw new InternalServerErrorException('Erro ao vincular lista de usuários à categoria');
        }
    }
}
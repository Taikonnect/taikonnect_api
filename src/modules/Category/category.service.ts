import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';



@Injectable()
export class CategoryService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async combolist() {

        const categories = await this.prismaService.category.findMany({
            where: {
                is_active: true
            }
        });

        return categories;
    }

    async create(data: CreateCategoryDto) {

        const group = await this.prismaService.group.findFirst({
            where: {
                shortname: 'wakaba',
            },
        });

        const category = await this.prismaService.category.create({
            data: {
                name: data.name,
                description: data.description,
                is_active: true,
                group_id: group.id ?? null,
            }
        });

        return {
            message: 'Categoria criada com sucesso',
            data: category
        };
    }

    async update(id: string, data: UpdateCategoryDto) {

        const group = await this.prismaService.group.findFirst({
            where: {
                shortname: 'wakaba',
            },
        });

        const category = await this.prismaService.category.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                description: data.description,
                is_active: true,
                group_id: group.id ?? null,
            }
        });

        return {
            message: 'Categoria atualizada com sucesso',
            data: category
        };
    }

    async delete(id: string) {
        await this.prismaService.category.delete({
            where: {
                id: id
            }
        });

        return {
            message: 'Categoria deletada com sucesso'
        };
    }
}

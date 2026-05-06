import { Body, Controller, Get, Param, Post, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { LinkCategoryUsersDto } from './dto/link-category-user.dto';

@ApiTags('Categoria')
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @ApiOperation({ summary: 'Criar categoria' })
    @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
    @ApiResponse({ status: 409, description: 'Categoria já cadastrada' })
    @Post('/create')
    async create(@Body() data: CreateCategoryDto) {
        return await this.categoryService.create(data);
    }

    @ApiOperation({ summary: 'Listagem de categorias' })
    @ApiResponse({ status: 200, description: 'Lista de categorias' })
    @Get('/list')
    async list() {
        return await this.categoryService.combolist();
    }

    @ApiOperation({ summary: 'Atualizar categoria' })
    @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
    @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
    @Post('/update/:id')
    async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
        return await this.categoryService.update(id, data);
    }

    @ApiOperation({ summary: 'Vincular lista de usuários a uma categoria' })
    @ApiResponse({ status: 201, description: 'Vínculos criados com sucesso' })
    @Post('/link-users-list')
    async linkUsersList(@Body() data: LinkCategoryUsersDto) {
        return await this.categoryService.linkUsersToCategory(data);
    }

    @ApiOperation({ summary: 'Remover vínculo entre usuário e categoria' })
    @ApiResponse({ status: 200, description: 'Vínculo removido com sucesso' })
    @Delete('/unlink-user/:userId/:categoryId')
    @ApiParam({ name: 'userId', type: 'string' })
    @ApiParam({ name: 'categoryId', type: 'string' })
    async unlinkUser(
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    ) {
        return await this.categoryService.unlinkUser(userId, categoryId);
    }

    @ApiOperation({ summary: 'Listar usuários vinculados a uma categoria' })
    @Get('/:id/users')
    async listCategoryUsers(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.categoryService.listUsersByCategory(id);
    }

    @ApiOperation({ summary: 'Listar categorias vinculadas a um usuário' })
    @Get('/user/:userId')
    async listUserCategories(@Param('userId', new ParseUUIDPipe()) userId: string) {
        return await this.categoryService.listCategoriesByUser(userId);
    }
}
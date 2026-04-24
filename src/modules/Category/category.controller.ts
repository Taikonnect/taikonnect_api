import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

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

}

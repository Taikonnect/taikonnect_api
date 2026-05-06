import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Publicações')
@Controller('publications')
export class PublicationController {
    constructor(private readonly publicationService: PublicationService) { }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova publicação' })
    @ApiResponse({ status: 201, description: 'Publicação criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    create(@Body() createPublicationDto: CreatePublicationDto) {
        return this.publicationService.create(createPublicationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as publicações' })
    @ApiResponse({ status: 200, description: 'Retorna a lista de publicações.' })
    findAll(@User() user_id: string) {
        return this.publicationService.findAll(user_id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma publicação pelo ID' })
    @ApiParam({ name: 'id', description: 'ID da publicação (UUID)' })
    @ApiResponse({ status: 200, description: 'Publicação encontrada.' })
    @ApiResponse({ status: 404, description: 'Publicação não encontrada.' })
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.publicationService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma publicação' })
    @ApiResponse({ status: 200, description: 'Publicação atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Publicação não encontrada.' })
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updatePublicationDto: UpdatePublicationDto,
    ) {
        return this.publicationService.update(id, updatePublicationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma publicação' })
    @ApiResponse({ status: 200, description: 'Publicação removida com sucesso.' })
    @ApiResponse({ status: 404, description: 'Publicação não encontrada.' })
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.publicationService.remove(id);
    }
}
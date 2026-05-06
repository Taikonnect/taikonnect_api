import { IsOptional, IsString, IsUUID } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePublicationDto {
    @ApiProperty({ example: 'Novidades do Projeto' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'Descrição detalhada da publicação...' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: { url: 'https://site.com', label: 'Link' } })
    @IsOptional()
    link?: any;

    @ApiPropertyOptional({ example: 'uuid-do-grupo' })
    @IsOptional()
    @IsUUID()
    group_id?: string;

    @ApiPropertyOptional({ example: 'uuid-do-usuario' })
    @IsOptional()
    @IsUUID()
    created_by?: string;

    @ApiPropertyOptional({ example: [{ name: 'file.pdf', type: 'application/pdf', data: 'binary' }] })
    @IsOptional()
    files?: any;

    @ApiPropertyOptional({ example: ['tech', 'news'] })
    @IsOptional()
    categories?: any;
}
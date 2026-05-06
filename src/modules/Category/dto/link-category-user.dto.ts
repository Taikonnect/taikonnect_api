import { IsArray, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkCategoryUsersDto {
    @ApiProperty({
        example: 'uuid-da-categoria',
        description: 'ID único da categoria'
    })
    @IsUUID()
    category_id: string;

    @ApiProperty({
        example: ['uuid-usuario-1', 'uuid-usuario-2'],
        description: 'Lista de UUIDs dos usuários',
        type: [String]
    })
    @IsArray()
    @IsUUID('4', { each: true })
    user_ids: string[];
}
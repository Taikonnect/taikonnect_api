import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
    name: string;

    @ApiProperty({ type: String, required: false, })
    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCategoryDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
    name: string;

    @ApiProperty({ type: String, required: false, })
    @IsString()
    @IsOptional()
    description?: string;
}
import { IsOptional, IsString, IsUUID } from "@nestjs/class-validator";

export class CreatePublicationDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    link?: any; // Json no Prisma

    @IsOptional()
    @IsUUID()
    group_id?: string;

    @IsOptional()
    @IsUUID()
    created_by?: string;

    @IsOptional()
    files?: any;

    @IsOptional()
    categories?: any;
}
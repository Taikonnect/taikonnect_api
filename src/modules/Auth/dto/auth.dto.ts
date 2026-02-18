import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsInt, Min, IsBoolean, MaxLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({ type: String, example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, example: '************' })
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class CreateUserDTO {
    @ApiProperty({ type: String, example: 'Maria da Silva' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, example: 'Maria', required: false })
    @IsOptional()
    @IsString()
    nickname: string;

    @ApiProperty({ type: String, example: '************' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ type: String, example: 'pt-BR' })
    @IsNotEmpty()
    @IsString()
    language: string;

    @ApiProperty({ type: String, example: 'dark' })
    @IsNotEmpty()
    @IsString()
    theme: string;

    @ApiProperty({ type: String, example: 'ID' })
    @IsNotEmpty()
    @IsString()
    group_id: string;
}

export class ResetPasswordDTO {
    @ApiProperty({ type: String, example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ValidateCodeDTO {
    @ApiProperty({ type: String, example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    code: string;
}

export class ChangePasswordDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, example: '************' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    token: string;
}

export class CheckPermissionDTO {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    permission: string;
}

export class ListDTO {

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    permission: string;

    @ApiProperty({ type: Boolean, required: false })
    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}

export class UpdateUserDTO {

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: Boolean, required: true })
    @IsNotEmpty()
    @IsBoolean()
    is_active?: boolean;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    nickname?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsDate()
    birth_date?: Date;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    rg?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    cpf?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    language?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    theme?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    observation?: string;

}
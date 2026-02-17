import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({ type: String ,example: 'user@domain.com.br' })
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
    @ApiProperty({ type: String ,example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ValidateCodeDTO {
    @ApiProperty({ type: String ,example: 'user@domain.com.br' })
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
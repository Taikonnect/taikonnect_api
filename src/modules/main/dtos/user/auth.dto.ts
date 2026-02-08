import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({ type: String ,example: 'user@domain.com.br' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, example: 'passwordExample' })
    @IsNotEmpty()
    @IsString()
    password: string;
}

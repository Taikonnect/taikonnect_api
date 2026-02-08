import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

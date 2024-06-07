import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    @MaxLength(320)
    @ApiProperty({ example: 'email@email.com' })
    readonly email: string

    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string
}
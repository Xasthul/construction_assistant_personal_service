import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    @MaxLength(320)
    @ApiProperty({
        example: 'email@email.com',
        description: "User's email"
    })
    readonly email: string

    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({ description: "User's password" })
    readonly password: string
}
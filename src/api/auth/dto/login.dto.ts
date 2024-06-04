import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsEmail()
    @ApiProperty({
        example: 'email@email.com',
        description: "User's email"
    })
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "User's password" })
    readonly password: string
}
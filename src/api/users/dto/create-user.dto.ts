import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @ApiProperty({
        example: 'email@email.com',
        description: "User's email"
    })
    readonly email: string

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    @ApiProperty({ description: "User's password" })
    readonly password: string
}
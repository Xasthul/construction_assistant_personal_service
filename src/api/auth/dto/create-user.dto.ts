import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string

    @IsEmail()
    @MaxLength(320)
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
        minUppercase: 1,
    })
    @MaxLength(256)
    @ApiProperty({ description: "User's password" })
    readonly password: string
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class ChangeUserPasswordDto {

    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty()
    readonly oldPassword: string

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    @MaxLength(256)
    @ApiProperty()
    readonly newPassword: string
}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength } from "class-validator";

export class AddUserToProjectDto {

    @IsEmail()
    @MaxLength(320)
    @ApiProperty()
    readonly userEmail: string;
}

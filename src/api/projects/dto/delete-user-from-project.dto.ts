import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DeleteUserFromProjectDto {

    @IsEmail()
    @MaxLength(320)
    @ApiProperty()
    readonly userEmail: string;
}

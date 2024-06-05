import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class DeleteUserFromProjectDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly projectId: string;

    @IsEmail()
    @ApiProperty()
    readonly userEmail: string;
}

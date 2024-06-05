import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProjectDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly title: string;
}

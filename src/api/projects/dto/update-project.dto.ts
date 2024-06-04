import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly title: string;
}

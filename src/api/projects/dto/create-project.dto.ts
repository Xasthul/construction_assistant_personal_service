import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;
}

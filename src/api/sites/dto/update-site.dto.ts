import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSiteDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly title: string;
}

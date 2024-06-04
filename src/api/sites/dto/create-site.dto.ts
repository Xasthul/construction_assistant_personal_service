import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSiteDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;

    @IsUUID()
    @ApiProperty()
    readonly projectId: string;
}

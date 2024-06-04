import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateStepDto {

    @IsUUID()
    @ApiProperty()
    readonly projectId: string

    @IsUUID()
    @ApiProperty()
    readonly siteId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly details: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ description: 'Array of base64 encoded assets' })
    readonly assets: string[]
}
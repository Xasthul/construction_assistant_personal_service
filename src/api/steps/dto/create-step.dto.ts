import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator"

export class CreateStepDto {

    @IsUUID()
    @ApiProperty()
    readonly projectId: string

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

    @IsInt()
    @Min(0)
    @ApiProperty()
    readonly priority: number
}
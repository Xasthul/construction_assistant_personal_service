import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

export class UpdateStepDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
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
    @IsOptional()
    @ApiProperty()
    readonly priority: number
}
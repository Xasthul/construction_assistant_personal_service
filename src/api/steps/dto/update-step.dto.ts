import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator"

export class UpdateStepDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly title: string

    @IsString()
    @MaxLength(500)
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
    @Max(250)
    @IsOptional()
    @ApiProperty()
    readonly order: number
}
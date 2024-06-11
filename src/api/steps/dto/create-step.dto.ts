import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateStepDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @ApiProperty()
    readonly details: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ description: 'Array of base64 encoded assets' })
    readonly assets: string[]

    @IsInt()
    @Min(1)
    @Max(250)
    @ApiProperty()
    readonly order: number
}
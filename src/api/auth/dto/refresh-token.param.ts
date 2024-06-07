import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RefreshTokenParam {

    @IsString()
    @MaxLength(1000)
    @IsNotEmpty()
    @ApiProperty()
    readonly refreshToken: string
}
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenResource {
    @ApiProperty()
    readonly refreshToken: string

    constructor(refreshToken: string) {
        this.refreshToken = refreshToken;
    }

    static from (refreshToken: string): RefreshTokenResource {
        return new RefreshTokenResource(refreshToken);
    }
}

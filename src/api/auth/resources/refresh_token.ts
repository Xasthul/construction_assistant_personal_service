import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenResource {
    @ApiProperty()
    readonly accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    static from (accessToken: string): RefreshTokenResource {
        return new RefreshTokenResource(accessToken);
    }
}

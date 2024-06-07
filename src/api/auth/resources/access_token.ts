import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenResource {
    @ApiProperty()
    readonly accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    static from (accessToken: string): AccessTokenResource {
        return new AccessTokenResource(accessToken);
    }
}

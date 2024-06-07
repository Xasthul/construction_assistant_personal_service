import { ApiProperty } from "@nestjs/swagger"
import { RefreshTokenResource } from "./refresh-token";

export class RefreshTokenItemResource {

    @ApiProperty({ type: RefreshTokenResource })
    readonly data: RefreshTokenResource

    constructor(refreshToken: RefreshTokenResource) {
        this.data = refreshToken;
    }

    static from (refreshToken: RefreshTokenResource): RefreshTokenItemResource {
        return new RefreshTokenItemResource(refreshToken);
    }
}

import { ApiProperty } from "@nestjs/swagger"
import { AccessTokenResource } from "./access-token";

export class AccessTokenItemResource {

    @ApiProperty({ type: AccessTokenResource })
    readonly data: AccessTokenResource

    constructor(accessTokenResource: AccessTokenResource) {
        this.data = accessTokenResource;
    }

    static from (accessTokenResource: AccessTokenResource): AccessTokenItemResource {
        return new AccessTokenItemResource(accessTokenResource);
    }
}

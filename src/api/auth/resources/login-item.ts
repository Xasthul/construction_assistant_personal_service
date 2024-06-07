import { ApiProperty } from "@nestjs/swagger"
import { LoginResource } from "./login";

export class LoginItemResource {

    @ApiProperty({ type: LoginResource })
    readonly data: LoginResource

    constructor(loginResource: LoginResource) {
        this.data = loginResource;
    }

    static from (loginResource: LoginResource): LoginItemResource {
        return new LoginItemResource(loginResource);
    }
}

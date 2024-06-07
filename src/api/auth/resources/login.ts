import { ApiProperty } from "@nestjs/swagger";
import { LoginTokens } from "src/domain/types/login_tokens";

export class LoginResource {
    @ApiProperty()
    readonly accessToken: string

    @ApiProperty()
    readonly refreshToken: string

    constructor(loginTokens: LoginTokens) {
        this.accessToken = loginTokens.accessToken;
        this.refreshToken = loginTokens.refreshToken;
    }

    static from (loginTokens: LoginTokens): LoginResource {
        return new LoginResource(loginTokens);
    }
}

import { ApiProperty } from "@nestjs/swagger"
import { UserResource } from "./user";

export class UserItemResource {

    @ApiProperty({ type: UserResource })
    readonly data: UserResource

    constructor(userResource: UserResource) {
        this.data = userResource;
    }

    static from (userResource: UserResource): UserItemResource {
        return new UserItemResource(userResource);
    }
}

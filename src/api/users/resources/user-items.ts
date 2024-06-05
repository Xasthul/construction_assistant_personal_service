import { ApiProperty } from "@nestjs/swagger"
import { UserResource } from "./user";

export class UserItemsResource {

    @ApiProperty({
        isArray: true,
        type: UserResource,
    })
    readonly data: UserResource[]

    constructor(users: UserResource[]) {
        this.data = users;
    }

    static from (users: UserResource[]): UserItemsResource {
        return new UserItemsResource(users);
    }
}
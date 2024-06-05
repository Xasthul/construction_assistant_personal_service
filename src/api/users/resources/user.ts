import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/domain/models/user.entity";

export class UserResource {

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly email: string

    constructor(user: User) {
        this.name = user.name;
        this.email = user.email;
    }

    static from (user: User): UserResource {
        return new UserResource(user);
    }
}

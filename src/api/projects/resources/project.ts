import { ApiProperty } from "@nestjs/swagger"
import { UserResource } from "src/api/users/resources/user";
import { Project } from "src/domain/models/project.entity";

export class ProjectResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly title: string

    @ApiProperty({
        isArray: true,
        type: UserResource,
    })
    readonly users: UserResource[]

    @ApiProperty()
    readonly isOwner: boolean

    constructor(project: Project, isOwner: boolean) {
        this.id = project.id;
        this.title = project.title;
        this.users = project.users.map(user => UserResource.from(user));
        this.isOwner = isOwner;
    }

    static from(project: Project, isOwner: boolean): ProjectResource {
        return new ProjectResource(project, isOwner);
    }
}

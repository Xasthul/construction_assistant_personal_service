import { ApiProperty } from "@nestjs/swagger"
import { Project } from "src/domain/models/project.entity";

export class ProjectResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly title: string

    constructor(project: Project) {
        this.id = project.id;
        this.title = project.title;
    }

    static from(project: Project): ProjectResource {
        return new ProjectResource(project);
    }
}

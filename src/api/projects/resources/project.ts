import { ApiProperty } from "@nestjs/swagger"
import { Project } from "src/domain/models/project.entity";

export class ProjectResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly title: string

    @ApiProperty({ description: 'Project owner id' })
    readonly createdBy: string

    constructor(project: Project) {
        this.id = project.id;
        this.title = project.title;
        this.createdBy = project.createdById;
    }

    static from (project: Project): ProjectResource {
        return new ProjectResource(project);
    }
}

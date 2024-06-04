import { ApiProperty } from "@nestjs/swagger"
import { ProjectResource } from "./project";

export class ProjectItemResource {

    @ApiProperty({ type: ProjectResource })
    readonly data: ProjectResource

    constructor(project: ProjectResource) {
        this.data = project;
    }

    static from(project: ProjectResource): ProjectItemResource {
        return new ProjectItemResource(project);
    }
}

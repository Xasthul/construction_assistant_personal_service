import { ApiProperty } from "@nestjs/swagger"
import { Step } from "src/domain/models/step.entity"

export class StepResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly projectId: string

    @ApiProperty()
    readonly title: string

    @ApiProperty({ nullable: true })
    readonly details: string

    @ApiProperty({ nullable: true })
    readonly assets: string[]

    @ApiProperty()
    readonly priority: number

    @ApiProperty()
    readonly isCompleted: boolean

    @ApiProperty({ nullable: true })
    readonly completedBy: string

    constructor(step: Step) {
        this.id = step.id;
        this.projectId = step.projectId;
        this.title = step.title;
        this.details = step.details;
        this.assets = step.assets;
        this.priority = step.priority;
        this.isCompleted = step.isCompleted;
        this.completedBy = step.completedBy;
    }

    static from (step: Step): StepResource {
        return new StepResource(step);
    }
}
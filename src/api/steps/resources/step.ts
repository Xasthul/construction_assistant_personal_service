import { ApiProperty } from "@nestjs/swagger"
import { Step } from "src/domain/models/step.entity"

export class StepResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly projectId: string

    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly details: string

    @ApiProperty()
    readonly assets: string[]

    @ApiProperty()
    readonly order: number

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
        this.order = step.order;
        this.isCompleted = step.isCompleted;
        this.completedBy = step.completedBy;
    }

    static from (step: Step): StepResource {
        return new StepResource(step);
    }
}
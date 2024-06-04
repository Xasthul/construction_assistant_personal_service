import { ApiProperty } from "@nestjs/swagger"
import { Step } from "src/domain/models/step.entity"

export class StepResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly details: string

    @ApiProperty()
    readonly assets: string[]

    @ApiProperty()
    readonly isCompleted: boolean

    @ApiProperty()
    readonly siteId: string

    constructor(step: Step) {
        this.id = step.id;
        this.title = step.title;
        this.details = step.details;
        this.assets = step.assets;
        this.isCompleted = step.isCompleted;
        this.siteId = step.siteId;
    }

    static from(step: Step): StepResource {
        return new StepResource(step);
    }
}
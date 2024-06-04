import { ApiProperty } from "@nestjs/swagger"
import { StepResource } from "./step";

export class StepItemsResource {

    @ApiProperty({
        isArray: true,
        type: StepResource
    })
    readonly data: StepResource[]

    constructor(steps: StepResource[]) {
        this.data = steps;
    }

    static from(steps: StepResource[]): StepItemsResource {
        return new StepItemsResource(steps);
    }
}

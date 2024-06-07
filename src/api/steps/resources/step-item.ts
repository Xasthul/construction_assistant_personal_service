import { ApiProperty } from "@nestjs/swagger"
import { StepResource } from "./step";

export class StepItemResource {

    @ApiProperty({ type: StepResource })
    readonly data: StepResource

    constructor(stepResource: StepResource) {
        this.data = stepResource;
    }

    static from (stepResource: StepResource): StepItemResource {
        return new StepItemResource(stepResource);
    }
}

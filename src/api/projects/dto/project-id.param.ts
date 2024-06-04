import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ProjectIdParam {

    @IsUUID()
    @ApiProperty()
    projectId: string
}

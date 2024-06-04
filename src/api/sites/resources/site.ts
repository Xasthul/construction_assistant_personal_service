import { ApiProperty } from "@nestjs/swagger";
import { Site } from "src/domain/models/site.entity";

export class SiteResource {

    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly title: string

    constructor(site: Site) {
        this.id = site.id;
        this.title = site.title;
    }

    static from(site: Site): SiteResource {
        return new SiteResource(site);
    }
}

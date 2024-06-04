import { ApiProperty } from "@nestjs/swagger"
import { SiteResource } from "./site";

export class SiteItemsResource {

    @ApiProperty({
        isArray: true,
        type: SiteResource,
    })
    readonly data: SiteResource[]

    constructor(sites: SiteResource[]) {
        this.data = sites;
    }

    static from(sites: SiteResource[]): SiteItemsResource {
        return new SiteItemsResource(sites);
    }
}

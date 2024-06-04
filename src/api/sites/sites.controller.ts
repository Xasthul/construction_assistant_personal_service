import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { ProjectIdParam } from '../projects/dto/project-id.param';
import { SiteItemsResource } from './resources/site-items';
import { SiteResource } from './resources/site';
import { SiteIdParam } from './dto/site-id.param';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('sites')
@UseGuards(JwtAuthGuard)
@ApiTags('Sites')
@ApiBearerAuth('JWT-auth')
export class SitesController {
    constructor(private sitesService: SitesService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get all sites for project" })
    @ApiResponse({ status: HttpStatus.OK })
    async findAll(
        @Query() projectIdParam: ProjectIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        const sites = await this.sitesService.findAll(projectIdParam.projectId, user.id);

        return SiteItemsResource.from(
            sites.map(
                (site) => SiteResource.from(site)
            ),
        );
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create site for project" })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project with such id not found' })
    create(
        @Body() createSiteDto: CreateSiteDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.sitesService.create(createSiteDto, user.id);
    }

    @Put(':siteId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Update site" })
    @ApiResponse({ status: HttpStatus.OK })
    update(
        @Query() projectIdParam: ProjectIdParam,
        @Param() siteIdParam: SiteIdParam,
        @Body() updateSiteDto: UpdateSiteDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.sitesService.update(
            projectIdParam.projectId,
            siteIdParam.siteId,
            updateSiteDto,
            user.id,
        );
    }

    @Delete(':siteId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Remove site" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site not found' })
    delete(
        @Query() projectIdParam: ProjectIdParam,
        @Param() siteIdParam: SiteIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        return this.sitesService.delete(
            projectIdParam.projectId,
            siteIdParam.siteId,
            user.id
        );
    }
}

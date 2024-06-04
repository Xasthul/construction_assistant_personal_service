import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectIdParam } from './dto/project-id.param';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectItemsResource } from './resources/project-items';
import { ProjectResource } from './resources/project';
import { ProjectItemResource } from './resources/project-item';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@ApiBearerAuth('JWT-auth')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get all user's projects" })
    @ApiResponse({ status: HttpStatus.OK, type: ProjectItemsResource })
    async findAll(@RequestUser() user: JwtPayload) {
        const projects = await this.projectsService.findAll(user.id);

        return ProjectItemsResource.from(
            projects.map(
                (project) => ProjectResource.from(project),
            ),
        );
    }

    @Get(':projectId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get user's project by id" })
    @ApiResponse({ status: HttpStatus.OK, type: ProjectItemResource })
    async findById(
        @Param() projectIdParam: ProjectIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        const project = await this.projectsService.findById(projectIdParam.projectId, user.id);

        return ProjectItemResource.from(
            ProjectResource.from(project)
        );
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create new project" })
    @ApiResponse({ status: HttpStatus.CREATED })
    create(
        @Body() createProjectDto: CreateProjectDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.projectsService.create(createProjectDto, user.id);
    }

    @Put(':projectId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Update user's project" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project with such id not found' })
    update(
        @Param() projectIdParam: ProjectIdParam,
        @Body() updateProjectDto: UpdateProjectDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.projectsService.update(projectIdParam.projectId, updateProjectDto, user.id)
    }

    @Delete(':projectId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Remove user's project" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project with such id not found' })
    delete(
        @Param() projectIdParam: ProjectIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        return this.projectsService.delete(projectIdParam.projectId, user.id);
    }
}

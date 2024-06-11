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
import { AddUserToProjectDto } from './dto/add-user-to-project.dto';
import { DeleteUserFromProjectDto } from './dto/delete-user-from-project.dto';

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
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "User not found" })
    async findAll(@RequestUser() user: JwtPayload) {
        const projectResourceArray = await this.projectsService.findAll(user.id);

        return ProjectItemsResource.from(projectResourceArray);
    }

    @Get(':projectId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get user's project by id" })
    @ApiResponse({ status: HttpStatus.OK, type: ProjectItemResource })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Project not found" })
    async findById(
        @Param() projectIdParam: ProjectIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        const projectResource = await this.projectsService.findById(projectIdParam.projectId, user.id);

        return ProjectItemResource.from(projectResource);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create new project" })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "User not found" })
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

    @Post(':projectId/add-user')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Add user to project" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project with such id not found' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User has been already added' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    addUser(
        @Param() projectIdParam: ProjectIdParam,
        @Body() addUserToProjectDto: AddUserToProjectDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.projectsService.addUser(
            projectIdParam.projectId,
            addUserToProjectDto.userEmail,
            user.id,
        );
    }

    @Delete(':projectId/delete-user')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Delete user from project" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project with such id not found' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found in project' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    deleteUser(
        @Param() projectIdParam: ProjectIdParam,
        @Body() deleteUserFromProjectDto: DeleteUserFromProjectDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.projectsService.deleteUser(
            projectIdParam.projectId,
            deleteUserFromProjectDto.userEmail,
            user.id,
        );
    }
}

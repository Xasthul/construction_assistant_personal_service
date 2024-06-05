import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { StepIdParam } from './dto/step-id.param';
import { UpdateStepDto } from './dto/update-step.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StepItemsResource } from './resources/step-items';
import { StepResource } from './resources/step';
import { ProjectIdParam } from '../projects/dto/project-id.param';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { JwtPayload } from '../auth/dto/jwt-payload';

@Controller('steps')
@UseGuards(JwtAuthGuard)
@ApiTags('Steps')
@ApiBearerAuth('JWT-auth')
export class StepsController {
    constructor(readonly stepsService: StepsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all steps' })
    @ApiResponse({ status: HttpStatus.OK, type: StepItemsResource })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Project not found" })
    async findAll (
        @Query() projectIdParam: ProjectIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        const steps = await this.stepsService.findAll(
            projectIdParam.projectId,
            user.id,
        );

        return StepItemsResource.from(
            steps.map(
                (step) => StepResource.from(step),
            ),
        );
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create new step' })
    @ApiResponse({ status: HttpStatus.CREATED, type: StepResource })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Project with such id was not found" })
    create (
        @Param() projectIdParam: ProjectIdParam,
        @Body() createStepDto: CreateStepDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.stepsService.create(
            projectIdParam.projectId,
            createStepDto,
            user.id,
        );
    }

    @Put(':stepId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update step' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    update (
        @Query() projectIdParam: ProjectIdParam,
        @Param() stepIdParam: StepIdParam,
        @Body() updateStepDto: UpdateStepDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.stepsService.update(
            projectIdParam.projectId,
            stepIdParam.stepId,
            updateStepDto,
            user.id,
        );
    }

    @Delete(':stepId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remove step' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    delete (
        @Query() projectIdParam: ProjectIdParam,
        @Param() stepIdParam: StepIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        return this.stepsService.delete(
            projectIdParam.projectId,
            stepIdParam.stepId,
            user.id,
        );
    }

    @Put('complete/:stepId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Complete step' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step or User not found' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Step with previous priority not found' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Step with previous priority not completed' })
    complete (
        @Query() projectIdParam: ProjectIdParam,
        @Param() stepIdParam: StepIdParam,
        @RequestUser() user: JwtPayload,
    ) {
        return this.stepsService.complete(
            projectIdParam.projectId,
            stepIdParam.stepId,
            user.id,
        );
    }
}

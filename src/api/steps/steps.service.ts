import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { Repository } from 'typeorm';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Project } from 'src/domain/models/project.entity';
import { User } from 'src/domain/models/user.entity';
import { DeleteStepFailedError, PreviousStepNotCompletedError, StepNotFoundError, StepWithPreviousOrderNotFoundError } from './types/step-errors';
import { ProjectNotFoundError } from '../projects/types/project-errors';
import { UserNotFoundError } from '../users/types/user-errors';

@Injectable()
export class StepsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(Step)
        private stepRepository: Repository<Step>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(
        projectId: string,
        userId: string
    ): Promise<Step[]> {
        return await this.stepRepository.find({
            where: {
                project: {
                    id: projectId,
                    users: [{ id: userId }],
                },
            }
        });
    }

    async findById(
        projectId: string,
        stepId: string,
        userId: string,
    ): Promise<Step> {
        const step = await this.stepRepository.findOne({
            where: {
                project: {
                    id: projectId,
                    users: [{ id: userId }],
                },
                id: stepId,
            },
        });
        if (!step) {
            throw new StepNotFoundError();
        }
        return step;
    }

    async create(
        projectId: string,
        createStepDto: CreateStepDto,
        userId: string
    ): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                createdById: userId,
            },
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }
        if (createStepDto.order > 1) {
            await this.verifyStepWithPreviousOrderExists(projectId, createStepDto.order - 1);
        }

        const step = new Step();
        step.projectId = project.id;
        step.title = createStepDto.title;
        step.details = createStepDto.details;
        step.assets = createStepDto.assets;
        step.order = createStepDto.order;
        await this.stepRepository.insert(step);
    }

    async update(
        projectId: string,
        stepId: string,
        updateStepDto: UpdateStepDto,
        userId: string,
    ): Promise<void> {
        const step = await this.stepRepository.findOne({
            where: {
                project: {
                    id: projectId,
                    createdById: userId,
                },
                id: stepId,
            },
        });
        if (!step) {
            throw new StepNotFoundError();
        }
        if (updateStepDto.order && updateStepDto.order > 1) {
            await this.verifyStepWithPreviousOrderExists(projectId, updateStepDto.order - 1);
        }
        await this.stepRepository.update(stepId, updateStepDto);
    }

    async delete(
        projectId: string,
        stepId: string,
        userId: string,
    ): Promise<void> {
        const result = await this.stepRepository.delete({
            project: {
                id: projectId,
                createdById: userId,
            },
            id: stepId,
        });
        if (result.affected < 1) {
            throw new StepNotFoundError();
        }
        if (result.affected > 1) {
            throw new DeleteStepFailedError();
        }
    }

    async complete(
        projectId: string,
        stepId: string,
        userId: string,
    ): Promise<void> {
        const stepToComplete = await this.stepRepository.findOne({
            where: {
                project: {
                    id: projectId,
                    users: [{ id: userId }],
                },
                id: stepId,
            },
        });
        if (!stepToComplete) {
            throw new StepNotFoundError();
        }
        if (stepToComplete.order > 1) {
            const steps = await this.stepRepository.find({
                where: {
                    project: {
                        id: projectId,
                        users: [{ id: userId }],
                    },
                },
            });
            const previousSteps = steps.filter((step) => step.order < stepToComplete.order);
            previousSteps.sort((a, b) => b.order - a.order);
            if (previousSteps.length) {
                for (let step of previousSteps) {
                    if (!step.isCompleted) {
                        throw new PreviousStepNotCompletedError();
                    }
                }
            }
        }
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new UserNotFoundError();
        }
        await this.stepRepository.update(
            stepId, {
            isCompleted: true,
            completedBy: user.name,
        },
        );
    }

    private async verifyStepWithPreviousOrderExists(projectId: string, previousOrder: number) {
        const steps = await this.stepRepository.find({
            where: {
                projectId: projectId,
                order: previousOrder,
            },
        });
        if (!steps.length) {
            throw new StepWithPreviousOrderNotFoundError();
        }
    }
}

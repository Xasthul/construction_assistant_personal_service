import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { Repository } from 'typeorm';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Project } from 'src/domain/models/project.entity';
import { User } from 'src/domain/models/user.entity';

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

    async findAll (
        projectId: string,
        userId: string
    ): Promise<Step[]> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                users: [{ id: userId }],
            },
            relations: { users: false, steps: false, createdBy: false },
        });
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        // if (!(project.users.some(e => e.id === userId))) {
        //     throw new ForbiddenException('Access to project denied');
        // }
        return await this.stepRepository.find({
            where: {
                project: {
                    id: projectId,
                },
            }
        });
    }

    async create (
        projectId: string,
        createStepDto: CreateStepDto,
        userId: string
    ): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                createdById: userId,
            },
            relations: { users: false, steps: false, createdBy: false },
        });
        if (!project) {
            throw new NotFoundException('Project with such id was not found');
        }
        const step = new Step();
        step.projectId = project.id;
        step.title = createStepDto.title;
        step.details = createStepDto.details;
        step.assets = createStepDto.assets;
        step.priority = createStepDto.priority;
        await this.stepRepository.save(step);
    }

    async update (
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
            relations: { project: false },
        });
        if (!step) {
            throw new NotFoundException();
        }
        await this.stepRepository.update(stepId, updateStepDto);
    }

    async delete (
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
            throw new NotFoundException();
        }
    }

    async complete (
        projectId: string,
        stepId: string,
        userId: string,
    ): Promise<void> {
        const step = await this.stepRepository.findOne({
            where: {
                project: {
                    id: projectId,
                    users: [{ id: userId }],
                },
                id: stepId,
            },
            relations: { project: false },
        });
        if (!step) {
            throw new NotFoundException('Step not found');
        }
        const stepPriority = step.priority;
        if (stepPriority !== 0) {
            const stepWithPreviousPriority = await this.stepRepository.findOne({
                where: {
                    project: {
                        id: projectId,
                        users: [{ id: userId }],
                    },
                    priority: stepPriority - 1,
                },
                relations: { project: false },
            });
            if (!stepWithPreviousPriority) {
                throw new InternalServerErrorException('Step with previous priority not found');
            }
            if (!stepWithPreviousPriority.isCompleted) {
                throw new ForbiddenException('Previous step is not completed');
            }
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: { projects: false, createdProjects: false },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.stepRepository.update(
            stepId,
            {
                isCompleted: true,
                completedBy: user.name,
            },
        );
    }
}

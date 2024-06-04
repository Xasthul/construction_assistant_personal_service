import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { Repository } from 'typeorm';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Site } from 'src/domain/models/site.entity';

@Injectable()
export class StepsService {
    constructor(
        @InjectRepository(Site)
        private siteRepository: Repository<Site>,
        @InjectRepository(Step)
        private stepRepository: Repository<Step>
    ) { }

    async findAll(
        projectId: string,
        siteId: string,
        userId: string
    ): Promise<Step[]> {
        return await this.stepRepository.find({
            where: {
                site: {
                    project: {
                        id: projectId,
                        userId: userId,
                    },
                    id: siteId,
                },
            }
        });
    }

    async create(createStepDto: CreateStepDto, userId: string): Promise<void> {
        const site = await this.siteRepository.findOne({
            where: {
                project: {
                    id: createStepDto.projectId,
                    userId: userId,
                },
                id: createStepDto.siteId,
            },
            relations: { project: false, steps: false },
        });
        if (!site) {
            throw new NotFoundException('Site with such id was not found');
        }
        const step = new Step();
        step.title = createStepDto.title;
        step.details = createStepDto.details;
        step.assets = createStepDto.assets;
        step.siteId = site.id;
        await this.stepRepository.save(step);
    }

    async update(
        projectId: string,
        siteId: string,
        stepId: string,
        updateStepDto: UpdateStepDto,
        userId: string,
    ): Promise<void> {
        const step = await this.stepRepository.findOne({
            where: {
                site: {
                    project: {
                        id: projectId,
                        userId: userId,
                    },
                    id: siteId,
                },
                id: stepId,
            },
            relations: { site: false },
        });
        if (!step) {
            throw new NotFoundException();
        }
        await this.stepRepository.update(stepId, updateStepDto);
    }

    async delete(
        projectId: string,
        siteId: string,
        stepId: string,
        userId: string,
    ): Promise<void> {
        const result = await this.stepRepository.delete({
            site: {
                project: {
                    userId: userId,
                    id: projectId,
                },
                id: siteId,
            },
            id: stepId,
        });
        if (result.affected < 1) {
            throw new NotFoundException();
        }
    }

    async complete(
        projectId: string,
        siteId: string,
        stepId: string,
        userId: string,
    ): Promise<void> {
        const step = await this.stepRepository.findOne({
            where: {
                site: {
                    project: {
                        id: projectId,
                        userId: userId,
                    },
                    id: siteId,
                },
                id: stepId,
            },
            relations: { site: false },
        });
        if (!step) {
            throw new NotFoundException();
        }
        await this.stepRepository.update(stepId, { isCompleted: true });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from '../../domain/models/site.entity';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { Project } from '../../domain/models/project.entity';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(Site)
        private siteRepository: Repository<Site>
    ) { }

    async findAll(projectId: string, userId: string): Promise<Site[]> {
        return await this.siteRepository.find({
            where: {
                project: {
                    id: projectId,
                    userId: userId
                }
            },
            relations: { project: false, steps: false },
        });
    }

    async create(createSiteDto: CreateSiteDto, userId: string): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: createSiteDto.projectId,
                userId: userId,
            },
            relations: { user: false, sites: false },
        });
        if (!project) {
            throw new NotFoundException('Project with such id was not found');
        }
        const site = new Site();
        site.title = createSiteDto.title;
        site.projectId = project.id;
        await this.siteRepository.save(site);
    }

    async update(
        projectId: string,
        siteId: string,
        updateSiteDto: UpdateSiteDto,
        userId: string
    ): Promise<void> {
        const site = await this.siteRepository.findOne({
            where: {
                project: {
                    id: projectId,
                    userId: userId
                },
                id: siteId,
            },
            relations: { project: false, steps: false },
        });
        if (!site) {
            throw new NotFoundException();
        }
        await this.siteRepository.update(siteId, updateSiteDto);
    }

    async delete(
        projectId: string,
        siteId: string,
        userId: string
    ): Promise<void> {
        const result = await this.siteRepository.delete({
            project: {
                userId: userId,
                id: projectId,
            },
            id: siteId,
        });
        if (result.affected < 1) {
            throw new NotFoundException();
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../domain/models/project.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    async findAll(userId: string): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { user: { id: userId } },
            relations: { user: false, sites: false },
        });
    }

    async findById(projectId: string, userId: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                userId: userId,
            },
            relations: { user: false, sites: false },
        });
        if (!project) {
            throw new NotFoundException();
        }
        return project;
    }

    async create(createProjectDto: CreateProjectDto, userId: string): Promise<void> {
        const project = new Project();
        project.title = createProjectDto.title;
        project.userId = userId;
        await this.projectRepository.save(project);
    }

    async update(
        projectId: string,
        updateProjectDto: UpdateProjectDto,
        userId: string,
    ): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                userId: userId,
            },
            relations: { user: false, sites: false },
        });
        if (!project) {
            throw new NotFoundException();
        }
        await this.projectRepository.update(projectId, updateProjectDto);
    }

    async delete(projectId: string, userId: string): Promise<void> {
        const result = await this.projectRepository.delete({ userId: userId, id: projectId });
        if (result.affected < 1) {
            throw new NotFoundException();
        }
    }
}

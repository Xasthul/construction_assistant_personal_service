import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../domain/models/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/domain/models/user.entity';
import { DeleteCreatorFromProjectError, DeleteProjectFailedError, ProjectNotFoundError, UserAlreadyAddedToProjectError, UserNotAddedToProjectError } from './types/project-errors';
import { UserNotFoundError } from '../users/types/user-errors';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll (userId: string): Promise<Project[]> {
        return await this.projectRepository.find({
            where: {
                users: [{ id: userId }]
            },
            relations: { users: true },
        });
    }

    async findById (projectId: string, userId: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                users: [{ id: userId }]
            },
            relations: { users: true },
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }
        return project;
    }

    async create (createProjectDto: CreateProjectDto, userId: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: { projects: true },
        });
        if (!user) {
            throw new UserNotFoundError();
        }
        const project = new Project();
        project.title = createProjectDto.title;
        project.createdById = userId;
        await this.projectRepository.insert(project);

        project.users = [user];
        await this.projectRepository.save(project);
    }

    async update (
        projectId: string,
        updateProjectDto: UpdateProjectDto,
        userId: string,
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
        await this.projectRepository.update(projectId, updateProjectDto);
    }

    async delete (projectId: string, userId: string): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                createdById: userId,
            },
            relations: { users: true },
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }
        project.users = [];
        await this.projectRepository.save(project);

        const result = await this.projectRepository.delete({
            id: projectId,
            createdById: userId,
        });
        if (result.affected < 1) {
            throw new ProjectNotFoundError();
        }
        if (result.affected > 1) {
            throw new DeleteProjectFailedError();
        }
    }

    async addUser (
        projectId: string,
        userToAddEmail: string,
        userId: string,
    ): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                createdById: userId,
            },
            relations: { users: true },
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }
        const userToAdd = await this.userRepository.findOneBy({ email: userToAddEmail });
        if (!userToAdd) {
            throw new UserNotFoundError();
        }
        const userAlreadyAdded = project.users.some(e => e.email === userToAddEmail);
        if (userAlreadyAdded) {
            throw new UserAlreadyAddedToProjectError();
        }
        project.users.push(userToAdd);
        await this.projectRepository.save(project);
    }

    async deleteUser (
        projectId: string,
        userToDeleteEmail: string,
        userId: string,
    ): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                createdById: userId,
            },
            relations: { users: true },
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }
        const userToDelete = await this.userRepository.findOneBy({ email: userToDeleteEmail });
        if (!userToDelete) {
            throw new UserNotFoundError();
        }
        const userIsAddedToProject = project.users.some(e => e.email === userToDeleteEmail);
        if (!userIsAddedToProject) {
            throw new UserNotAddedToProjectError();
        }
        const isUserToDeleteCreator = userToDelete.id === project.createdById;
        if (isUserToDeleteCreator) {
            throw new DeleteCreatorFromProjectError();
        }
        project.users = project.users.filter(e => e.id !== userToDelete.id);
        await this.projectRepository.save(project);
    }
}

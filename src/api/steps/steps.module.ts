import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { Project } from 'src/domain/models/project.entity';
import { User } from 'src/domain/models/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project, Step, User])],
    controllers: [StepsController],
    providers: [StepsService],
})
export class StepsModule { }

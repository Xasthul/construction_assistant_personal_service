import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { Project } from 'src/domain/models/project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project, Step])],
    controllers: [StepsController],
    providers: [StepsService],
})
export class StepsModule { }

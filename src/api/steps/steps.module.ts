import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from '../../domain/models/step.entity';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { Site } from 'src/domain/models/site.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Site, Step])],
    controllers: [StepsController],
    providers: [StepsService],
})
export class StepsModule { }

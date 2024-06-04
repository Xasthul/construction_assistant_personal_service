import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { Site } from '../../domain/models/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../domain/models/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Site])],
  providers: [SitesService],
  controllers: [SitesController]
})
export class SitesModule { }

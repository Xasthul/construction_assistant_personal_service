import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Project } from "src/domain/models/project.entity";
import { Site } from "src/domain/models/site.entity";
import { Step } from "src/domain/models/step.entity";
import { User } from "src/domain/models/user.entity";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('dbHost'),
            port: configService.get<number>('dbPort'),
            username: configService.get<string>('dbUsername'),
            password: configService.get<string>('dbPassword'),
            database: configService.get<string>('dbDatabase'),
            entities: [User, Project, Site, Step],
            // TODO: must be false in prod
            synchronize: true,
        }
    }
}

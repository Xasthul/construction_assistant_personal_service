import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepsModule } from './steps/steps.module';
import { SitesModule } from './sites/sites.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { typeOrmAsyncConfig } from 'src/config/type-orm-async-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    ProjectsModule,
    SitesModule,
    StepsModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

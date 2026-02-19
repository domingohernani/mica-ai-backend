import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { UserGuard } from './common/guards/user.guard';
import { LlmModule } from './infrastructure/llm/llm.module';
import { SpeechModule } from './infrastructure/speech/speech.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { Conversation } from './interview/entities/conversation.entity';
import { Interview } from './interview/entities/interview.entity';
import { InterviewModule } from './interview/interview.module';
import { Job } from './job/entities/job.entity';
import { JobModule } from './job/job.module';
import { DepartmentModule } from './organization/department/department.module';
import { Department } from './organization/department/entities/department.entity';
import { Member } from './organization/entities/member.entity';
import { Organization } from './organization/entities/organization.entity';
import { Location } from './organization/location/entities/location.entity';
import { LocationModule } from './organization/location/location.module';
import { OrganizationModule } from './organization/organization.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true, // TODO: remove in production
      entities: [
        Interview,
        User,
        Organization,
        Job,
        Conversation,
        Member,
        Department,
        Location,
      ],
    }),
    LlmModule,
    InterviewModule,
    SpeechModule,
    StorageModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    JobModule,
    DepartmentModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AppModule {}

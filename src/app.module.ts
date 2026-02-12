import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { UserGuard } from './common/guards/user.guard';
import { LlmModule } from './infrastructure/llm/llm.module';
import { SpeechModule } from './infrastructure/speech/speech.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { Interview } from './interview/entities/interview.entity';
import { InterviewModule } from './interview/interview.module';
import { Job } from './job/entities/job.entity';
import { JobModule } from './job/job.module';
import { Organization } from './organization/entities/organization.entity';
import { OrganizationModule } from './organization/organization.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      synchronize: true, // TODO: remove in production
      entities: [Interview, User, Organization, Job],
    }),
    LlmModule,
    InterviewModule,
    SpeechModule,
    StorageModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    JobModule,
  ],
  controllers: [AppController, AuthController],
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

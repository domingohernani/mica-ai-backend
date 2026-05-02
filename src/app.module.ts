import { Connector } from '@google-cloud/cloud-sql-connector';
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
import { Organization } from './organization/entities/organization.entity';
import { Location } from './organization/location/entities/location.entity';
import { LocationModule } from './organization/location/location.module';
import { Member } from './organization/member/entities/member.entity';
import { MemberModule } from './organization/member/member.module';
import { OrganizationModule } from './organization/organization.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

// Generates the Cloud SQL connection options dynamically
const connector: Connector = new Connector();
const getAuthOptions: () => Promise<unknown> = async (): Promise<unknown> => {
  const clientOpts: unknown = await connector.getOptions({
    instanceConnectionName: 'mica-ai-495106:us-central1:mica-ai-db',
    // @ts-expect-error // Value is guaranteed correct
    ipType: 'PUBLIC',
    // @ts-expect-error // Value is guaranteed correct
    authType: 'IAM',
  });
  return clientOpts;
};

type Constructor = new (...args: unknown[]) => unknown;
const ENTITIES_LIST: Constructor[] = [
  Interview,
  User,
  Organization,
  Job,
  Conversation,
  Member,
  Department,
  Location,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return process.env.NODE_ENV === 'production'
          ? {
              type: 'postgres',
              extra: await getAuthOptions(),
              database: process.env.DB_NAME,
              username: 'mica-ai-495106@appspot.gserviceaccount.com',
              autoLoadEntities: true,
              synchronize: false,
              entities: ENTITIES_LIST,
            }
          : {
              type: 'postgres',
              host: process.env.POSTGRES_HOST,
              port: parseInt(process.env.POSTGRES_PORT!),
              username: process.env.POSTGRES_USERNAME,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DATABASE,
              synchronize: true, // TODO: remove in production
              entities: ENTITIES_LIST,
            };
      },
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
    MemberModule,
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

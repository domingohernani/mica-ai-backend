import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageModule } from '../infrastructure/storage/storage.module';
import { ApplicantEvaluation } from './entities/applicant-evaluation.entity';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  providers: [JobService],
  controllers: [JobController],
  imports: [
    TypeOrmModule.forFeature([Job, JobApplication, ApplicantEvaluation]),
    StorageModule,
  ],
})
export class JobModule {}

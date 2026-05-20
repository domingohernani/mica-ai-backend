import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageModule } from '../infrastructure/storage/storage.module';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobApplication } from './entities/job-application.entity';

@Module({
  providers: [JobService],
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job, JobApplication]), StorageModule],
})
export class JobModule {}

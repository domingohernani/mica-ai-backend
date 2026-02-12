import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Job } from './entities/job.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  providers: [JobService],
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job])],
})
export class JobModule {}

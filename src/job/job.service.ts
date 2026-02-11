import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import now from '../utils/dates/now';
import { Status } from './constants/status';
import { Job } from './entities/job.entity';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';

@Injectable()
export class JobService {
  // Inject the Job repository to perform database operations
  constructor(
    @InjectRepository(Job)
    private readonly job: MongoRepository<Job>,
  ) {}

  // Create Job
  async create(
    @Body(new ZodValidationPipe(createJobSchema))
    jobDto: CreateJobDto,
  ): Promise<Job> {
    // Creating new job DTO and modifying types (string -> ObjectId)
    const newJobDto: Job = {
      ...jobDto,
      status: Status.Open,
      organizationId: new ObjectId(jobDto.organizationId),
      createdBy: new ObjectId(jobDto.createdBy),
      createdAt: now(),
      updatedAt: now(),
    };

    const newJob: Job = this.job.create(newJobDto);
    // Return and save into the database
    return await this.job.save(newJob);
  }
}

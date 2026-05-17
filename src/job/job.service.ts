import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { type GetParamDto } from '../common/schemas/get-param.schema';
import now from '../utils/dates/now';
import toTimestamp from '../utils/dates/toTimestamp';
import { Status } from './constants/status';
import { Job } from './entities/job.entity';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';
import { GetAllJobsDto } from './schemas/get-all-jobs.schema';
import { type JobsDto } from './schemas/job.schema';
import { type UpdateJobDto } from './schemas/update-job.schema';

@Injectable()
export class JobService {
  // Inject the Job repository to perform database operations
  constructor(
    @InjectRepository(Job)
    private readonly job: Repository<Job>,
  ) {}

  // Find a job
  async find(jobDto: GetParamDto): Promise<JobsDto> {
    const job: Job | null = await this.job.findOne({
      where: {
        id: jobDto.id,
      },
      relations: {
        organization: true,
      },
      select: {
        organization: {
          // TODO: logo here
          name: true,
        },
      },
    });

    if (!job) {
      throw new NotFoundException(`No job found for ID ${jobDto.id}.`);
    }

    return job;
  }

  // Find all jobs by organization id
  async findAllByOrganizationId(
    organizationDto: GetParamDto,
  ): Promise<GetAllJobsDto> {
    // Find all departments using organizationId
    const jobs: Job[] | null = await this.job.find({
      where: {
        organizationId: organizationDto.id,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return jobs;
  }

  // Create Job
  async create(
    @Body(new ZodValidationPipe(createJobSchema))
    jobDto: CreateJobDto,
  ): Promise<Job> {
    // Creating new job DTO and modifying types
    const newJobDto: Job = {
      ...jobDto,
      status: Status.Open,
      applicationDeadline: jobDto.applicationDeadline
        ? toTimestamp(jobDto.applicationDeadline)
        : undefined,
      createdAt: now(),
      updatedAt: now(),
    };

    const newJob: Job = this.job.create(newJobDto);
    // Return and save into the database
    return await this.job.save(newJob);
  }

  // Update Job
  update(@Param() jobId: GetParamDto, @Body() jobBody: UpdateJobDto): void {
    console.log(jobId);
    console.log(jobBody);

    return;
  }
}

import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { type GetParamDto } from '../common/schemas/get-param.schema';
import { StorageService } from '../infrastructure/storage/storage.service';
import { ApplicationStatus } from '../interview/constants/application-status';
import now from '../utils/dates/now';
import toTimestamp from '../utils/dates/toTimestamp';
import { JobStatus } from './constants/job-status';
import { ApplicantEvaluation } from './entities/applicant-evaluation.entity';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';
import { type ApplicantEvaluationDto } from './schemas/applicant-evaluation.shema';
import { ApplicationDto } from './schemas/create-application.schema';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';
import { GetApplicationDto } from './schemas/get-all-applicatons.schema';
import { GetAllJobsDto } from './schemas/get-all-jobs.schema';
import { type JobsDto } from './schemas/job.schema';
import { JobApplicationParamsDto } from './schemas/job-application.params.schema';
import { type UpdateJobDto } from './schemas/update-job.schema';

@Injectable()
export class JobService {
  // Inject the Job repository to perform database operations
  constructor(
    @InjectRepository(Job)
    private readonly job: Repository<Job>,
    @InjectRepository(JobApplication)
    private readonly application: Repository<JobApplication>,
    @InjectRepository(ApplicantEvaluation)
    private readonly evaluation: Repository<ApplicantEvaluation>,
    private storage: StorageService,
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
      status: JobStatus.OPEN,
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

  async createApplication(
    jobDto: GetParamDto,
    applicationBody: ApplicationDto,
    file: Express.Multer.File,
  ): Promise<JobApplication> {
    // Find which organization the job belows
    const job: Job | null = await this.job.findOne({
      where: {
        id: jobDto.id,
      },
    });

    if (!job || !job.organizationId) {
      throw new NotFoundException(`No job found for ID ${jobDto.id}.`);
    }

    const applicationId: string = uuidv4();
    const bucketName: string = 'mica-ai-resumes';
    const fileExtension: string = file.originalname.split('.').pop() || '';
    const path: string = fileExtension
      ? `${jobDto.id}/${applicationId}.${fileExtension}`
      : `${jobDto.id}/${applicationId}`;
    // Upload resume
    await this.storage.upload(file.buffer, path, bucketName);

    // Creating new application DTO and modifying types
    const newApplicationDto: JobApplication = {
      id: applicationId,
      ...applicationBody.details,
      jobId: jobDto.id,
      organizationId: job.organizationId,
      status: ApplicationStatus.NEW_APPLICATION,
      resumePath: path,
      appliedAt: now(),
      updatedAt: now(),
    };

    const newApplication: JobApplication =
      this.application.create(newApplicationDto);
    // Return and save into the database

    await this.application.save(newApplication);

    return newApplicationDto;
  }

  async findAllApplications(
    applicationDto: GetParamDto,
  ): Promise<GetApplicationDto[]> {
    // Find all applications using organizationId
    const applications: JobApplication[] = await this.application.find({
      where: {
        jobId: applicationDto.id,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    return applications;
  }

  async findApplicant(
    applicationDto: JobApplicationParamsDto,
  ): Promise<GetApplicationDto> {
    // Find applicant using organizationId
    const application: JobApplication | null = await this.application.findOne({
      where: {
        id: applicationDto.applicationId,
        jobId: applicationDto.id,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    if (!application) {
      throw new NotFoundException(
        `No application found for ID ${applicationDto.id}.`,
      );
    }

    return application;
  }

  async evaluate(
    applicationDto: JobApplicationParamsDto,
    evaluationBody: ApplicantEvaluationDto,
  ): Promise<ApplicantEvaluation> {
    const application: JobApplication | null = await this.application.findOne({
      where: {
        id: applicationDto.applicationId,
        jobId: applicationDto.id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `No job found for ID ${applicationDto.id} under application ID ${applicationDto.applicationId}`,
      );
    }
    // Create DTO and save
    const applicationEvaluationDto: ApplicantEvaluation = {
      evaluation: evaluationBody,
      jobApplicationId: applicationDto.applicationId,
    };
    const applicationEvaluation: ApplicantEvaluation = this.evaluation.create(
      applicationEvaluationDto,
    );
    await this.evaluation.save(applicationEvaluation);
    return applicationEvaluation;
  }
}

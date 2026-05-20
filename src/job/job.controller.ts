import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Public } from '../common/decorators/public.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  type GetParamDto,
  getParamSchema,
} from '../common/schemas/get-param.schema';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';
import { JobService } from './job.service';
import {
  type ApplicationDto,
  createApplicationSchema,
} from './schemas/create-application.schema';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';
import { GetAllApplicationDto } from './schemas/get-all-applicatons.schema';
import { GetAllJobsDto } from './schemas/get-all-jobs.schema';
import { type JobsDto } from './schemas/job.schema';
import {
  type UpdateJobDto,
  updateJobSchema,
} from './schemas/update-job.schema';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Public()
  @Get(':id')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async find(@Param() interviewDto: GetParamDto): Promise<JobsDto> {
    return await this.jobService.find(interviewDto);
  }

  @Get('/organization/:id')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async findAllByOrganizationId(
    @Param() organizationDto: GetParamDto,
  ): Promise<GetAllJobsDto> {
    return await this.jobService.findAllByOrganizationId(organizationDto);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async create(@Body() jobDto: CreateJobDto): Promise<Job> {
    return await this.jobService.create(jobDto);
  }

  // TODO: implement
  @Patch(':id')
  update(
    @Param(new ZodValidationPipe(getParamSchema)) jobId: GetParamDto,
    @Body(new ZodValidationPipe(updateJobSchema)) jobBody: UpdateJobDto,
  ): void {
    this.jobService.update(jobId, jobBody);
  }

  // Applications
  @Post(':id/applications')
  @UseInterceptors(FileInterceptor('resume'))
  async createApplication(
    @Param(new ZodValidationPipe(getParamSchema)) jobId: GetParamDto,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(createApplicationSchema))
    applicationBody: ApplicationDto,
  ): Promise<JobApplication> {
    console.log(applicationBody);

    return await this.jobService.createApplication(
      jobId,
      applicationBody,
      file,
    );
  }

  @Get(':id/applications')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async getAllApplications(
    @Param() jobDto: GetParamDto,
  ): Promise<GetAllApplicationDto> {
    return this.jobService.getAllApplications(jobDto);
  }
}

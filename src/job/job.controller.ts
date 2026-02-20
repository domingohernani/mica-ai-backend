import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  type GetParamDto,
  getParamSchema,
} from '../common/schemas/get-param.schema';
import { Job } from './entities/job.entity';
import { JobService } from './job.service';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';
import { GetAllJobsDto } from './schemas/get-all-jobs.schema';
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
  async findAll(@Param() organizationDto: GetParamDto): Promise<GetAllJobsDto> {
    return await this.jobService.findAll(organizationDto);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async create(@Body() jobDto: CreateJobDto): Promise<Job> {
    return await this.jobService.create(jobDto);
  }

  @Patch(':id')
  update(
    @Param(new ZodValidationPipe(getParamSchema)) jobId: GetParamDto,
    @Body(new ZodValidationPipe(updateJobSchema)) jobBody: UpdateJobDto,
  ): void {
    this.jobService.update(jobId, jobBody);
  }
}

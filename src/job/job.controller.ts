import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
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
import {
  type UpdateJobDto,
  updateJobSchema,
} from './schemas/update-job.schema';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async create(@Body() jobDto: CreateJobDto): Promise<Job> {
    return await this.jobService.create(jobDto);
  }

  @Public()
  @Patch(':_id')
  update(
    @Param(new ZodValidationPipe(getParamSchema)) jobId: GetParamDto,
    @Body(new ZodValidationPipe(updateJobSchema)) jobBody: UpdateJobDto,
  ): void {
    this.jobService.update(jobId, jobBody);
  }
}

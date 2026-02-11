import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Job } from './entities/job.entity';
import { JobService } from './job.service';
import {
  type CreateJobDto,
  createJobSchema,
} from './schemas/create-job.schema';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async create(@Body() jobDto: CreateJobDto): Promise<Job> {
    return await this.jobService.create(jobDto);
  }
}

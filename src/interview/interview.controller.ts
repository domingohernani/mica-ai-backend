import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import { InterviewDto } from './interview.dto';
import { InterviewService } from './interview.service';
import { createInterviewSchema } from './schemas/create-interview.schema';
import type { GetInterviewParamDto } from './schemas/get-interview-param.schema';
import { getInterviewParamSchema } from './schemas/get-interview-param.schema';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewSerivce: InterviewService) {}

  @Get(':id')
  @UsePipes(new ZodValidationPipe(getInterviewParamSchema))
  async find(
    @Param() interviewDto: GetInterviewParamDto,
  ): Promise<InterviewDto> {
    return await this.interviewSerivce.find(interviewDto);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createInterviewSchema))
  async create(@Body() interviewDto: InterviewDto): Promise<InterviewDto> {
    return await this.interviewSerivce.create(interviewDto);
  }
}

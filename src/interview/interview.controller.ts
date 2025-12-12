import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import type { GetParamDto } from '../common/schemas/get-param.schema';
import { getParamSchema } from '../common/schemas/get-param.schema';
import { InterviewDto } from './interview.dto';
import { InterviewService } from './interview.service';
import { createInterviewSchema } from './schemas/create-interview.schema';

@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get(':_id')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async find(@Param() interviewDto: GetParamDto): Promise<InterviewDto> {
    return await this.interviewService.find(interviewDto);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createInterviewSchema))
  async create(@Body() interviewDto: InterviewDto): Promise<InterviewDto> {
    return await this.interviewService.create(interviewDto);
  }
}

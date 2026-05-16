import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { GetParamDto } from '../common/schemas/get-param.schema';
import { getParamSchema } from '../common/schemas/get-param.schema';
import { InterviewDto } from './interview.dto';
import { InterviewService } from './interview.service';
import { createInterviewSchema } from './schemas/create-interview.schema';
import {
  type InterviewParamDto,
  interviewParamSchema,
} from './schemas/interview-param.schema';

@Controller('organizations/:id')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get('interviews/:interviewId')
  async find(
    @Param(new ZodValidationPipe(interviewParamSchema))
    params: InterviewParamDto,
  ): Promise<InterviewDto> {
    return await this.interviewService.findByOrganizationId(
      { id: params.id },
      { id: params.interviewId },
    );
  }

  @Post('interviews')
  async create(
    @Param(new ZodValidationPipe(getParamSchema))
    param: GetParamDto,
    @Body(new ZodValidationPipe(createInterviewSchema))
    interviewDto: InterviewDto,
  ): Promise<InterviewDto> {
    return await this.interviewService.create(param, interviewDto);
  }
}

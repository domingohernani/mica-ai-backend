import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { getInterviewParamSchema } from './schemas/get-interview-param.schema';
import type { GetInterviewParamDto } from './schemas/get-interview-param.schema';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewSerivce: InterviewService) {}

  @Get(':id')
  @UsePipes(new ZodValidationPipe(getInterviewParamSchema))
  findAll(@Param() interviewDto: GetInterviewParamDto) {
    return this.interviewSerivce.find(interviewDto);
  }
}

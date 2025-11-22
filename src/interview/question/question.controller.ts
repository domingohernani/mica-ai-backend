import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { type GetParamDto } from '../../common/schemas/get-param.schema';
import { InterviewDto } from '../interview.dto';
import { QuestionService } from './question.service';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Controller('interview/:_id/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async find(
    @Param() questionDto: GetParamDto,
  ): Promise<GetQuestionDto | InterviewDto> {
    return await this.questionService.find(questionDto);
  }

  //   @Patch()
  //   async update(
  //     @Body() updateDto: UpdateQuestionDto,
  //   ): Promise<GetQuestionDto | InterviewDto> {
  //     return await this.questionService.update(updateDto);
  //   }
}

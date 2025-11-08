import { Controller, Get, Param } from '@nestjs/common';

import { type GetParamDto } from '../../common/schemas/get-param.schema';
import { QuestionService } from './question.service';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Controller('interview/:_id/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async find(
    @Param() questionDto: GetParamDto,
  ): Promise<GetQuestionDto | null> {
    return await this.questionService.find(questionDto);
  }
}

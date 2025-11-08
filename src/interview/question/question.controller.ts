import { Controller, Get, Param } from '@nestjs/common';

import { type GetParamDto } from '../../common/schemas/get-param.schema';
import { QuestionDto } from './question.dto';
import { QuestionService } from './question.service';

@Controller('interview/:_id/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async find(@Param() questionDto: GetParamDto): Promise<QuestionDto | null> {
    return await this.questionService.find(questionDto);
  }
}

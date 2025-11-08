import { Injectable } from '@nestjs/common';

import { InterviewDto } from '../interview.dto';
import { GetParamDto } from './../../common/schemas/get-param.schema';
import { InterviewService } from './../interview.service';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(private interview: InterviewService) {}

  // Get current unanswered question.
  async find(interviewDto: GetParamDto): Promise<QuestionDto | null> {
    // Use the find method of interview service.
    const interview: InterviewDto = await this.interview.find(interviewDto);

    // Get the current unanswered question. If undefined, it returns null, meaning
    // all questions are answered, so proceed to calculation.
    const currentQuestion =
      interview.conversation.find((convo) => !convo.isAnswered) ?? null;
    return currentQuestion;
  }
}

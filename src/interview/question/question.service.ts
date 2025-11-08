import { Injectable } from '@nestjs/common';

import { InterviewDto } from '../interview.dto';
import { GetParamDto } from './../../common/schemas/get-param.schema';
import { InterviewService } from './../interview.service';
import { QuestionDto } from './question.dto';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Injectable()
export class QuestionService {
  // Inject the Interview repository to perform database operations
  constructor(private interview: InterviewService) {}

  // Find current unanswered question.
  async find(interviewDto: GetParamDto): Promise<GetQuestionDto | null> {
    // Use the find method of interview service.
    const interview: InterviewDto = await this.interview.find(interviewDto);

    // Get the current unanswered question. If undefined, it returns null, meaning
    // all questions are answered, so proceed to calculation.
    const currentQuestion: QuestionDto | null =
      interview.conversation.find((convo: QuestionDto) => !convo.isAnswered) ??
      null;

    if (!currentQuestion) return null;

    // Transpose the _id type ObectId to type string
    const newCurrentQuestion: GetQuestionDto = {
      aiQuestion: currentQuestion.aiQuestion,
      _id: currentQuestion._id.toString(),
    };

    return newCurrentQuestion;
  }
}

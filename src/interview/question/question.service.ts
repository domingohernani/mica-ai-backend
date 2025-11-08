import { Injectable } from '@nestjs/common';

import { LlmService } from '../../llm/llm.service';
import {
  generateFirstQuestion,
  generateQuestion,
} from '../../utils/generate-prompt';
import { InterviewDto } from '../interview.dto';
import { GetParamDto } from './../../common/schemas/get-param.schema';
import { CreateLlmDto } from './../../llm/schemas/create-llm.schema';
import { InterviewService } from './../interview.service';
import { QuestionDto } from './question.dto';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Injectable()
export class QuestionService {
  // Inject the Interview repository to perform database operations
  constructor(
    private interview: InterviewService,
    private llm: LlmService,
  ) {}

  // Find current unanswered question.
  async find(interviewDto: GetParamDto): Promise<GetQuestionDto | null> {
    // Use the find method of interview service.
    const interview: InterviewDto = await this.interview.find(interviewDto);
    const conversation: QuestionDto[] = interview.conversation;

    // Get the current unanswered question. If undefined, it returns null, meaning
    // all questions are answered, so proceed to calculation.
    const currentQuestion: QuestionDto | null =
      conversation.find((convo: QuestionDto) => !convo.isAnswered) ?? null;

    if (!currentQuestion) return null;

    // Check the index of the current question. If at first question (index: 0),
    // call the LLM immediately since it does not depend on the previous response.
    const currentQuestionIndex: number = conversation.findIndex(
      (convo: QuestionDto) =>
        convo._id.toString() === currentQuestion._id.toString(),
    );

    let newCurrentQuestion: GetQuestionDto;
    const llmDto: CreateLlmDto = {
      model: 'gemma3:4b',
      prompt: '',
      stream: false,
    };
    // Check if the current question is the first question.
    // Injected prompt is a bit different on first, middle, and last question.
    if (currentQuestionIndex === 0) {
      // Generate custom injected prompt.
      const prompt: string = generateFirstQuestion(
        currentQuestion.originalQuestion,
      );
      llmDto.prompt = prompt;

      // TODO: include mp3 url that is stored in GCP
      // Attach the generated question to the current question
      const generatedQuestion: string = await this.llm.generate(llmDto);
      newCurrentQuestion = {
        aiQuestion: generatedQuestion,
        _id: currentQuestion._id.toString(),
      };
    } else {
      // Generate custom injected prompt.
      const originalQuestion: string = currentQuestion.originalQuestion;
      const answer: string = currentQuestion.answer;
      const nextQuestion: QuestionDto = conversation[currentQuestionIndex + 1];
      const prompt: string = generateQuestion(
        originalQuestion,
        answer,
        nextQuestion.originalQuestion,
      );
      llmDto.prompt = prompt;

      // TODO: include mp3 url that is stored in GCP
      // Attach the generated question to the current question
      const generatedQuestion: string = await this.llm.generate(llmDto);
      newCurrentQuestion = {
        aiQuestion: generatedQuestion,
        _id: currentQuestion._id.toString(),
      };
    }

    return newCurrentQuestion;
  }
}

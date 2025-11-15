import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { LlmService } from '../../llm/llm.service';
import {
  generateFirstQuestion,
  generateQuestion,
} from '../../utils/generate-prompt';
import { InterviewDto } from '../interview.dto';
import { GetParamDto } from './../../common/schemas/get-param.schema';
import { CreateLlmDto } from './../../llm/schemas/create-llm.schema';
import { Interview } from './../entities/interview.entity';
import { InterviewService } from './../interview.service';
import { QuestionDto } from './question.dto';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Injectable()
export class QuestionService {
  // Inject the Interview repository to perform database operations
  constructor(
    // We directly use the interview repo becauuse this service is still part of the interview schema.
    @InjectRepository(Interview) private interviewRepo: Repository<Interview>,
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

    // Check if there's already AI generated response/question.
    if (currentQuestion.aiQuestion)
      return { ...currentQuestion, _id: currentQuestion._id.toString() };

    // Get the index of the current question.
    const currentQuestionIndex: number = conversation.findIndex(
      (convo: QuestionDto) =>
        convo._id.toString() === currentQuestion._id.toString(),
    );

    // Actual generated AI prompt
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
    } else {
      // Generate custom injected prompt.
      // Get the previous interaction to for the LLM to analyze.
      const previousConvo: QuestionDto = conversation[currentQuestionIndex - 1];
      const previousQuestion: string = previousConvo.aiQuestion;
      const previousAnswer: string = previousConvo.answer;
      const nextQuestion: string = currentQuestion.originalQuestion;

      const prompt: string = generateQuestion(
        previousQuestion,
        previousAnswer,
        nextQuestion,
      );
      llmDto.prompt = prompt;
    }

    // Call LLM to generate question.
    const generatedQuestion: string = await this.llm.generate(llmDto);

    const newQuestion: QuestionDto = {
      _id: currentQuestion._id,
      originalQuestion: currentQuestion.originalQuestion,
      aiQuestion: generatedQuestion,
      answer: '',
      isAnswered: false,
    };

    // Update current conversation/question
    await this.update(
      interviewDto,
      { _id: currentQuestion._id.toString() },
      newQuestion,
    );

    // TODO: include mp3 url that is stored in GCP Text-to-Speech
    // Attach the generated question to the current question
    const newCurrentQuestion: GetQuestionDto = {
      aiQuestion: generatedQuestion,
      _id: currentQuestion._id.toString(),
    };
    return newCurrentQuestion;
  }

  // Update interview question
  async update(
    interviewId: GetParamDto,
    questionId: GetParamDto,
    question: QuestionDto,
  ): Promise<QuestionDto[]> {
    // Use the find() method of interview service repository.
    const interview: InterviewDto = await this.interview.find(interviewId);
    const conversation: QuestionDto[] = interview.conversation;

    // Modify the specific question or converstation
    const updatedConversation: QuestionDto[] = conversation.map(
      (_question: QuestionDto) => {
        if (_question._id.toString() == questionId._id.toString()) {
          return question;
        }
        return _question;
      },
    );

    // Update the conversation in the database using interview repository
    await this.interview.update<InterviewDto, '_id'>(
      interviewId,
      { _id: new ObjectId(interviewId._id) },
      { conversation: updatedConversation },
    );

    return updatedConversation;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import { type GetParamDto } from '../../common/schemas/get-param.schema';
import { InterviewDto } from '../interview.dto';
import { getParamSchema } from './../../common/schemas/get-param.schema';
import { QuestionService } from './question.service';
import type { GetQuestionDto } from './schemas/get-question.schema';
import type { GetQuestionParamDto } from './schemas/get-question-param.schema';
import { getQuestionParamSchema } from './schemas/get-question-param.schema';

@Controller('interviews/:_id')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('questions')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async find(
    @Param() interviewDto: GetParamDto,
  ): Promise<GetQuestionDto | InterviewDto> {
    return await this.questionService.find(interviewDto);
  }

  @Patch('questions/:questionId')
  @UseInterceptors(FileInterceptor('video'))
  async update(
    @Param('_id') _id: string,
    @Param('questionId') questionId: string,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<GetQuestionDto | InterviewDto> {
    const params: GetQuestionParamDto = { _id, questionId };
    const validated: GetQuestionParamDto = getQuestionParamSchema.parse(params);

    return await this.questionService.updateAndTransribe(
      { _id: validated._id },
      { _id: validated.questionId },
      file,
    );
  }
}

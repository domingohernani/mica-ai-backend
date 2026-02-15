import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
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

// TODO: modularize

@Controller('interviews/:id')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('questions')
  async find(
    @Param(new ZodValidationPipe(getParamSchema))
    interviewDto: GetParamDto,
  ): Promise<GetQuestionDto | InterviewDto> {
    return await this.questionService.find(interviewDto);
  }

  @Patch('questions/:questionId')
  @UseInterceptors(FileInterceptor('video'))
  async update(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @UploadedFile() videoBuffer: Buffer,
  ): Promise<GetQuestionDto | InterviewDto> {
    const params: GetQuestionParamDto = { id, questionId };
    const validated: GetQuestionParamDto = getQuestionParamSchema.parse(params);

    return await this.questionService.updateAndTransribe(
      { id: validated.id },
      { id: validated.questionId },
      videoBuffer,
    );
  }

  @Post('questions/:questionId/chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async updateChunk(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @UploadedFile() chunk: Express.Multer.File,
    @Body() body: { chunkNumber: string; isLastChunk: string },
  ): Promise<GetQuestionDto | InterviewDto | { isChunkStored: true }> {
    const params: GetQuestionParamDto = { id, questionId };
    const validated: GetQuestionParamDto = getQuestionParamSchema.parse(params);

    // Type conversion
    const parsedChunkNumber: number = parseInt(body.chunkNumber, 10);
    const parsedIsLastChunk: boolean = body.isLastChunk === 'true';

    return await this.questionService.updateByChunk(
      { id: validated.id },
      { id: validated.questionId },
      parsedChunkNumber,
      chunk,
      parsedIsLastChunk,
    );
  }
}

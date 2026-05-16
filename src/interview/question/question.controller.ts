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

import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { type GetParamDto } from '../../common/schemas/get-param.schema';
import { InterviewDto } from '../interview.dto';
import { getParamSchema } from './../../common/schemas/get-param.schema';
import { QuestionService } from './question.service';
import type { GetQuestionDto } from './schemas/get-question.schema';
import type { GetQuestionParamDto } from './schemas/get-question-param.schema';
import { getQuestionParamSchema } from './schemas/get-question-param.schema';

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
    @Param(new ZodValidationPipe(getQuestionParamSchema))
    params: GetQuestionParamDto,
    @UploadedFile() videoBuffer: Buffer,
  ): Promise<GetQuestionDto | InterviewDto> {
    return await this.questionService.updateAndTransribe(
      { id: params.id },
      { id: params.questionId },
      videoBuffer,
    );
  }

  @Post('questions/:questionId/chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async updateChunk(
    @Param(new ZodValidationPipe(getQuestionParamSchema))
    params: GetQuestionParamDto,
    @UploadedFile() chunk: Express.Multer.File,
    @Body() body: { chunkNumber: string; isLastChunk: string },
  ): Promise<GetQuestionDto | InterviewDto | { isChunkStored: true }> {
    // Type conversion
    const parsedChunkNumber: number = parseInt(body.chunkNumber, 10);
    const parsedIsLastChunk: boolean = body.isLastChunk === 'true';

    return await this.questionService.updateByChunk(
      { id: params.id },
      { id: params.questionId },
      parsedChunkNumber,
      chunk,
      parsedIsLastChunk,
    );
  }
}

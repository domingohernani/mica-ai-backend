import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
    @UploadedFile() videoBuffer: Buffer,
  ): Promise<GetQuestionDto | InterviewDto> {
    const params: GetQuestionParamDto = { _id, questionId };
    const validated: GetQuestionParamDto = getQuestionParamSchema.parse(params);

    return await this.questionService.updateAndTransribe(
      { _id: validated._id },
      { _id: validated.questionId },
      videoBuffer,
    );
  }

  @Post('questions/:questionId/chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async updateChunk(
    @Param('_id') _id: string,
    @Param('questionId') questionId: string,
    @UploadedFile() chunk: Express.Multer.File,
    @Body() body: { chunkNumber: string; isLastChunk: string },
  ): Promise<GetQuestionDto | InterviewDto | { isChunkStored: true }> {
    const params: GetQuestionParamDto = { _id, questionId };
    const validated: GetQuestionParamDto = getQuestionParamSchema.parse(params);

    // Type conversion
    const parsedChunkNumber: number = parseInt(body.chunkNumber, 10);
    const parsedIsLastChunk: boolean = body.isLastChunk === 'true';

    return await this.questionService.updateByChunk(
      { _id: validated._id },
      { _id: validated.questionId },
      parsedChunkNumber,
      chunk,
      parsedIsLastChunk,
    );
  }
}

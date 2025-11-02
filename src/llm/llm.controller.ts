import { LlmService } from './llm.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createLlmSchema } from './schemas/create-llm.schema';
import type { CreateLlmDto } from './schemas/create-llm.schema';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLlmSchema))
  async generate(@Body() llmDto: CreateLlmDto) {
    return await this.llmService.generate(llmDto);
  }
}

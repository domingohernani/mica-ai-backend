import { CreateLlmDto } from './dto/create-llm.dto';
import { LlmService } from './llm.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmservice: LlmService) {}

  @Post()
  async generate(@Body() llmDto: CreateLlmDto) {
    return await this.llmservice.generate(llmDto);
  }
}

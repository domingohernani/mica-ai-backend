import { CreateLlmDto } from './schemas/create-llm.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LlmService {
  private readonly url = 'http://localhost:11434/api/generate';

  async generate(llmDto: CreateLlmDto): Promise<CreateLlmDto> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(llmDto),
    });
    const result = (await response.json()) as CreateLlmDto;
    return result;
  }
}

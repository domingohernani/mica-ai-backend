import { Injectable } from '@nestjs/common';

import { CreateLlmDto } from './schemas/create-llm.schema';

interface LlmResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}
@Injectable()
export class LlmService {
  private readonly url: string = 'http://localhost:11434/api/generate';

  async generate(llmDto: CreateLlmDto): Promise<string> {
    const response: Response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(llmDto),
    });

    console.log(llmDto);

    const result: LlmResponse = (await response.json()) as LlmResponse;
    // Remove \n characters. It might confuse the TTS.
    return result.response.replace(/\n+/g, ' ');
  }
}

import { Body, Controller, Post } from '@nestjs/common';

import { SynthesizeResponse } from '../common/types/tts.types';
import { SpeechService } from './speech.service';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post()
  async create(@Body('text') text: string): Promise<SynthesizeResponse> {
    return await this.speechService.synthesize(text);
  }
}

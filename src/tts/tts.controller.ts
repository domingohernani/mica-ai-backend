import { Body, Controller, Post } from '@nestjs/common';

import { SynthesizeResponse } from './../common/types/tts.types';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  async create(@Body('text') text: string): Promise<SynthesizeResponse> {
    return await this.ttsService.synthesize(text);
  }
}

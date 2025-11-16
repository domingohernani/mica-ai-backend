import { protos } from '@google-cloud/text-to-speech';
import { Controller, Get } from '@nestjs/common';

import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get()
  async create(): Promise<
    [
      protos.google.cloud.texttospeech.v1.IListVoicesResponse,
      protos.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      unknown,
    ]
  > {
    return await this.ttsService.synthesize();
  }
}

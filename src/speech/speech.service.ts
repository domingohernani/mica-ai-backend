import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Injectable } from '@nestjs/common';

import {
  SynthesizeRequest,
  SynthesizeResponse,
} from '../common/types/tts.types';

@Injectable()
export class SpeechService {
  private client: TextToSpeechClient;

  constructor() {
    this.client = new TextToSpeechClient();
  }

  async synthesize(text: string): Promise<SynthesizeResponse> {
    const request: SynthesizeRequest = {
      input: { text: text },
      voice: {
        languageCode: 'en-US',
        ssmlGender: 'FEMALE',
        name: 'en-US-Chirp3-HD-Achernar',
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Type-safe assignment
    const result: [SynthesizeResponse, unknown, unknown] =
      await this.client.synthesizeSpeech(request);

    const response: SynthesizeResponse = result[0];

    return response;
  }
}

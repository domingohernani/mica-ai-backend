import { protos, SpeechClient } from '@google-cloud/speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Injectable } from '@nestjs/common';

import { TtsConfig, TtsRequest } from '../../common/types/stt.types';
import {
  SynthesizeRequest,
  SynthesizeResponse,
} from '../../common/types/tts.types';

@Injectable()
export class SpeechService {
  private clientTts: TextToSpeechClient;
  private clientStt: SpeechClient;

  constructor() {
    this.clientTts = new TextToSpeechClient();
    this.clientStt = new SpeechClient();
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
      await this.clientTts.synthesizeSpeech(request);

    const response: SynthesizeResponse = result[0];

    return response;
  }

  async transcribe(uri: string): Promise<string | undefined> {
    const audio: {
      uri: string;
    } = { uri: uri };

    const config: TtsConfig = {
      encoding:
        protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.MP3,
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      useEnhanced: true,
      model: 'latest_long',
      enableAutomaticPunctuation: true,
    };

    const request: TtsRequest = { config, audio };

    const [operation] = await this.clientStt.longRunningRecognize(request);
    const [response] = await operation.promise();

    if (!response.results || !response.results.length) return '';

    const transcript: string = response.results
      .map(
        (result: protos.google.cloud.speech.v1.ISpeechRecognitionResult) =>
          result.alternatives?.[0]?.transcript,
      )
      .filter(Boolean)
      .join(' ');

    return transcript;
  }
}

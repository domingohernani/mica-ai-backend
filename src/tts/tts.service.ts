import { protos, TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';

@Injectable()
export class TtsService {
  private client: TextToSpeechClient;

  constructor() {
    const keyPath: string = path.join(__dirname, '../../src/keys/mica-ai.json');
    process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
    this.client = new TextToSpeechClient();
  }

  async synthesize(): Promise<
    [
      protos.google.cloud.texttospeech.v1.IListVoicesResponse,
      protos.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      unknown,
    ]
  > {
    const sample: string =
      'Ang bango bango ni Hernani kahit na hindi siya maligo. Pero si Princess Mica ay napakabaho kahit kaliligo pa lang';
    const tempStorage: string = path.join(__dirname, '../../temp');

    // const client: TextToSpeechClient = new TextToSpeechClient();

    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text: sample },
        voice: {
          languageCode: 'fil-PH',
          ssmlGender: 'FEMALE',
          name: 'fil-PH-Wavenet-A',
        },
        audioConfig: { audioEncoding: 'MP3' },
      };

    // Type-safe assignment
    const result: [
      protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
      unknown,
      unknown,
    ] = await this.client.synthesizeSpeech(request);

    const response: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse =
      result[0];

    const voices: [
      protos.google.cloud.texttospeech.v1.IListVoicesResponse,
      protos.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      unknown,
    ] = await this.client.listVoices();

    await fs.writeFile(
      path.join(tempStorage, 'test.mp3'),
      response.audioContent as Buffer,
      'binary',
    );

    return voices;
  }
}

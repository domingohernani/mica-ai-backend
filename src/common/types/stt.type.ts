import { protos } from '@google-cloud/speech';

export type AudioEncoding =
  protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
export type TtsConfig = {
  encoding: AudioEncoding;
  sampleRateHertz: number;
  languageCode: string;
  useEnhanced: boolean;
  model: string;
  enableAutomaticPunctuation: boolean;
};
export type TtsRequest = {
  config: TtsConfig;
  audio: {
    uri: string;
  };
};

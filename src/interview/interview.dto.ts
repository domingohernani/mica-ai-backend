import { ObjectId } from 'mongodb';

export class InterviewDto {
  readonly _id: ObjectId;
  readonly conversation: {
    _id: ObjectId;
    originalQuestion: string;
    aiQuestion: string;
    answer: string;
    isAnswered: boolean;
  }[];
  readonly isDone: boolean;
  readonly finalMessage: string;
  readonly finalTtsSignedUrl: string;
}

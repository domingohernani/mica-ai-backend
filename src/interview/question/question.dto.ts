import { ObjectId } from 'mongodb';

export class QuestionDto {
  _id: ObjectId;
  originalQuestion: string;
  aiQuestion: string;
  answer: string;
  isAnswered: boolean;
}

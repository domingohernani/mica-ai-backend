import { Interview } from '../entities/interview.entity';

export class QuestionDto {
  id: string;
  originalQuestion: string;
  aiQuestion: string;
  answer: string;
  isAnswered: boolean;
  interview: Interview;
}

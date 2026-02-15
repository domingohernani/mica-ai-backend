export class QuestionDto {
  id: string;
  originalQuestion: string;
  order: number;
  aiQuestion: string | null;
  answer: string | null;
  isAnswered: boolean;
  interviewId: string;
}

export class QuestionDto {
  id: string | null;
  originalQuestion: string;
  aiQuestion: string | null;
  answer: string | null;
  isAnswered: boolean;
  interviewId: string;
}

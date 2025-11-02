export class InterviewDto {
  readonly id: number;
  conversation: {
    id: number;
    originalQuestion: string;
  }[];
}

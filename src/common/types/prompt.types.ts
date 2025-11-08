//  Types for generating interview question prompts (prompt injection).
export type GenerateFirstQuestion = (question: string) => string;
export type GenerateQuestion = (
  currentQuestion: string,
  intervieweeAnswer: string,
  nextQuestion: string,
) => string;

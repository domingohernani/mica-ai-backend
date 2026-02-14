import z from 'zod';
import { ZodType } from 'zod';

import { QuestionDto } from '../question/question.dto';

export const createInterviewSchema: ZodType<{
  conversations: Omit<QuestionDto, 'id' | 'interviewId'>[];
  isDone: boolean;
}> = z.object({
  conversations: z.array(
    z.object({
      originalQuestion: z.string(),
      aiQuestion: z.string().nullable().default(null),
      answer: z.string().nullable().default(null),
      isAnswered: z.boolean().default(false),
    }),
  ),
  isDone: z.boolean().default(false),
});

import z from 'zod';
import { ZodType } from 'zod';

import { QuestionDto } from '../question/question.dto';

export const createInterviewSchema: ZodType<{
  conversations: Pick<QuestionDto, 'originalQuestion'>[];
  isDone: boolean;
}> = z.object({
  conversations: z.array(
    z.object({
      originalQuestion: z.string(),
    }),
  ),
  isDone: z.boolean().default(false),
});

import z from 'zod';
import { ZodType } from 'zod';

export const updateQuestionSchema: ZodType<{
  aiQuestion: string;
  aiTtsSignedUrl: string;
  id: string;
}> = z.object({
  aiQuestion: z.string(),
  aiTtsSignedUrl: z.string(),
  id: z.uuid(),
});

export type UpdateQuestionDto = z.infer<typeof updateQuestionSchema>;

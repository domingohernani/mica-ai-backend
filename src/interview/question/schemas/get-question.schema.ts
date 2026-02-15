import z from 'zod';
import { ZodType } from 'zod';

export const getQuestionSchema: ZodType<{
  aiQuestion: string;
  aiTtsSignedUrl: string;
  id: string;
}> = z.object({
  aiQuestion: z.string(),
  aiTtsSignedUrl: z.string(),
  id: z.uuid(),
});

export type GetQuestionDto = z.infer<typeof getQuestionSchema>;

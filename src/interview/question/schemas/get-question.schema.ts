import z from 'zod';
import { ZodType } from 'zod';

export const getQuestionSchema: ZodType<{
  aiQuestion: string;
  aiTtsSignedUrl: string;
  _id: string;
}> = z.object({
  aiQuestion: z.string(),
  aiTtsSignedUrl: z.string(),
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
});

export type GetQuestionDto = z.infer<typeof getQuestionSchema>;

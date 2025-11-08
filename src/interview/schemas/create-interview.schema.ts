import z from 'zod';
import { ZodType } from 'zod';

export const createInterviewSchema: ZodType<{
  conversation: {
    _id?: string;
    originalQuestion: string;
    aiQuestion: string | null;
    answer: string | null;
    isAnswered: boolean;
  }[];
  isDone: boolean;
}> = z.object({
  conversation: z.array(
    z.object({
      _id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
        .optional(),
      originalQuestion: z.string(),
      aiQuestion: z.string().nullable().default(null),
      answer: z.string().nullable().default(null),
      isAnswered: z.boolean().default(false),
    }),
  ),
  isDone: z.boolean().default(false),
});

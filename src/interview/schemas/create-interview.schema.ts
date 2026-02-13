import z from 'zod';
import { ZodType } from 'zod';

export const createInterviewSchema: ZodType<{
  conversations: {
    id?: string;
    originalQuestion: string;
    aiQuestion: string | null;
    answer: string | null;
    isAnswered: boolean;
  }[];
  isDone: boolean;
}> = z.object({
  conversations: z.array(
    z.object({
      id: z
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

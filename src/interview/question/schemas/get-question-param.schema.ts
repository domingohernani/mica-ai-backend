import z, { ZodType } from 'zod';

export const getQuestionParamSchema: ZodType<{
  _id: string;
  questionId: string;
}> = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  questionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
});

export type GetQuestionParamDto = z.infer<typeof getQuestionParamSchema>;

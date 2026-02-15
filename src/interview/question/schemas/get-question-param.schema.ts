import z, { ZodType } from 'zod';

export const getQuestionParamSchema: ZodType<{
  id: string;
  questionId: string;
}> = z.object({
  id: z.uuid(),
  questionId: z.uuid(),
});

export type GetQuestionParamDto = z.infer<typeof getQuestionParamSchema>;

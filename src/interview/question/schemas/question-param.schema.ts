import z, { ZodType } from 'zod';

export const questionParamSchema: ZodType<{
  id: string;
  questionId: string;
}> = z.object({
  id: z.uuid(),
  questionId: z.uuid(),
});

export type QuestionParamDto = z.infer<typeof questionParamSchema>;

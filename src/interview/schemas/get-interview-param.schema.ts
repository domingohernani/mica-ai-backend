import z from 'zod';

export const getInterviewParamSchema = z.object({
  _id: z.string(),
});

export type GetInterviewParamDto = z.infer<typeof getInterviewParamSchema>;

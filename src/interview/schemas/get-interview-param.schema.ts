import z from 'zod';

export const getInterviewParamSchema = z.object({
  id: z.coerce.number(),
});

export type GetInterviewParamDto = z.infer<typeof getInterviewParamSchema>;

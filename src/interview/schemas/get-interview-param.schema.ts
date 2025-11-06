import { ObjectId } from 'mongodb';
import z from 'zod';

export const getInterviewParamSchema = z.object({
  id: z.string(),
});

export type GetInterviewParamDto = z.infer<typeof getInterviewParamSchema>;

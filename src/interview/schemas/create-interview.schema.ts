import z from 'zod';

export const createInterviewSchema = z.object({
  id: z.number().optional(),
  answer: z.string(),
});

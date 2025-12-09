import z, { ZodType } from 'zod';

export const createLlmSchema: ZodType<{
  model: string;
  prompt: string;
  stream: boolean;
}> = z.object({
  model: z.string(),
  prompt: z.string(),
  stream: z.boolean(),
});

export type CreateLlmDto = z.infer<typeof createLlmSchema>;

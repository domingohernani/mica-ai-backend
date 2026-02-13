import z, { ZodType } from 'zod';

export const getParamSchema: ZodType<{
  id: string;
}> = z.object({
  id: z.uuid(),
});

export type GetParamDto = z.infer<typeof getParamSchema>;

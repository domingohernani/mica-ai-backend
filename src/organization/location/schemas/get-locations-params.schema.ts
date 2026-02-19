import z, { ZodType } from 'zod';

export const getLocationsParamSchema: ZodType<{
  organizationId: string;
}> = z.object({
  organizationId: z.uuid(),
});

export type GetLocationsParamDto = z.infer<typeof getLocationsParamSchema>;

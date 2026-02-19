import z, { ZodType } from 'zod';

export const locationParamSchema: ZodType<{
  organizationId: string;
  locationId: string;
}> = z.object({
  organizationId: z.uuid(),
  locationId: z.uuid(),
});

export type LocationParamDto = z.infer<typeof locationParamSchema>;

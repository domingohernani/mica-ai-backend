import z, { ZodType } from 'zod';

export const organizationParamSchema: ZodType<{
  organizationId: string;
}> = z.object({
  organizationId: z.uuid(),
});

export type OrganizationParamDto = z.infer<typeof organizationParamSchema>;

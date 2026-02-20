import z, { ZodType } from 'zod';

export const getOrganizationParamSchema: ZodType<{
  organizationId: string;
}> = z.object({
  organizationId: z.uuid(),
});

export type GetOrganizationParamDto = z.infer<
  typeof getOrganizationParamSchema
>;

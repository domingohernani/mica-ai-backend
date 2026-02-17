import z, { ZodType } from 'zod';

export const departmentParamSchema: ZodType<{
  organizationId: string;
  departmentId: string;
}> = z.object({
  organizationId: z.uuid(),
  departmentId: z.uuid(),
});

export type DepartmentParamDto = z.infer<typeof departmentParamSchema>;

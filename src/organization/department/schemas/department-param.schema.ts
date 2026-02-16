import z, { ZodType } from 'zod';

export const departmentParamSchema: ZodType<{
  id: string;
  departmentId: string;
}> = z.object({
  id: z.uuid(),
  departmentId: z.uuid(),
});

export type DepartmentParamDto = z.infer<typeof departmentParamSchema>;

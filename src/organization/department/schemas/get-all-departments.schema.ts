import { z, ZodType } from 'zod';

type GetAllDepartment = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
};

export const getAllDepartmentSchema: ZodType<GetAllDepartment[]> = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
    createdBy: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    organizationId: z.uuid(),
  }),
);

export type GetAllDepartmentDto = z.infer<typeof getAllDepartmentSchema>;

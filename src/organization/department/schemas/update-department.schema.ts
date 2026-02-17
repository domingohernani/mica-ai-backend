import z from 'zod';
import { ZodType } from 'zod';

import now from '../../../utils/dates/now';

// Specifying the types
type UpdateDepartmentType = {
  name: string;
  updatedAt?: Date;
};

export const updateDepartmentSchema: ZodType<UpdateDepartmentType> = z.object({
  name: z.string().min(1, 'Department is required').max(100),
  updatedAt: z.date().default(now()).optional(),
});

export type UpdateDepartmentDto = z.infer<typeof updateDepartmentSchema>;

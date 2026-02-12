import z from 'zod';
import { ZodType } from 'zod';

import now from '../../utils/dates/now';
import { Status } from '../constants/status';

// Specifying the types
type UpdateJobType = {
  position?: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const updateJobSchema: ZodType<UpdateJobType> = z
  .object({
    position: z.string().min(1, 'Position is required').max(100).optional(),
    description: z.string().optional(),
    status: z.enum(Status).optional(),
    createdAt: z.date().default(now()).optional(),
    updatedAt: z.date().default(now()).optional(),
  })
  .refine(
    (data: UpdateJobType) =>
      Object.values(data).some((value: unknown) => value !== undefined),
    {
      message: 'At least one field must be provided',
    },
  );

export type UpdateJobDto = z.infer<typeof updateJobSchema>;

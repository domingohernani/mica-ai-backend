import z from 'zod';
import { ZodType } from 'zod';

import now from '../../../utils/dates/now';

// Specifying the types
type UpdateLocationType = {
  name: string;
  updatedAt?: Date;
};

export const updateLocationSchema: ZodType<UpdateLocationType> = z.object({
  name: z.string().min(1, 'Location is required').max(100),
  updatedAt: z.date().default(now()).optional(),
});

export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;

import { z, ZodType } from 'zod';

type GetAllLocation = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
};

export const getAllLocationsSchema: ZodType<GetAllLocation[]> = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
    createdBy: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    organizationId: z.uuid(),
  }),
);

export type GetAllLocationsDto = z.infer<typeof getAllLocationsSchema>;

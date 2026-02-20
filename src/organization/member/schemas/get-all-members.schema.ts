import { z, ZodType } from 'zod';

import { Roles } from '../../../constants/roles';

type GetAllMembers = {
  userId: string;
  role: string;
  joinedAt: Date;
  organizationId: string;
};

export const getAllMembersSchema: ZodType<GetAllMembers[]> = z.array(
  z.object({
    userId: z.uuid(),
    role: z.enum(Roles),
    joinedAt: z.date(),
    organizationId: z.uuid(),
  }),
);

export type GetAllMembersDto = z.infer<typeof getAllMembersSchema>;

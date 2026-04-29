import { z, ZodType } from 'zod';

import { Roles } from '../../../constants/roles';

type GetMember = {
  role: string;
  joinedAt: Date;
  organizationId: string;
  userId: string;
};

export const getMemberSchema: ZodType<GetMember> = z.object({
  role: z.enum(Roles),
  joinedAt: z.date(),
  organizationId: z.uuid(),
  userId: z.uuid(),
});

export type GetMemberDto = z.infer<typeof getMemberSchema>;

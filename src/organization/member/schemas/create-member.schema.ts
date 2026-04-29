import z, { ZodType } from 'zod';

import { Roles } from '../../../constants/roles';

export const createMemberSchema: ZodType<{
  role: string;
  joinedAt: Date;
  organizationId: string;
  userId: string;
}> = z.object({
  role: z.enum(Roles),
  joinedAt: z.date(),
  organizationId: z.uuid(),
  userId: z.uuid(),
});

export type CreateMemberDto = z.infer<typeof createMemberSchema>;

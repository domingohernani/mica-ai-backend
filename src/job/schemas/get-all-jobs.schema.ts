import z, { ZodType } from 'zod';

import { Status } from '../constants/status';

export const getAllJobsSchema: ZodType<
  {
    organizationId: string;
    createdBy: string;
    position: string;
    department: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    description: string;
    requirements: string;
    assignedRecruiter: string;
    salaryMin?: number;
    salaryMax?: number;
    benefits?: string;
    openPositions: number;
    applicationDeadline?: string;
    skills?: string[];
  }[]
> = z.array(
  z.object({
    organizationId: z.uuid(),
    createdBy: z.uuid(),

    // Required fields
    position: z.string(),
    department: z.string(),
    location: z.string(),
    employmentType: z.string(),
    experienceLevel: z.string(),
    description: z.string(),
    requirements: z.string(),
    assignedRecruiter: z.string(),
    status: z.enum(Status),

    // Optional fields
    salaryMin: z.number().min(0).optional(),
    salaryMax: z.number().min(0).optional(),
    benefits: z.string().optional(),
    openPositions: z.number().min(1).default(1),
    applicationDeadline: z.string().optional(),
    skills: z.array(z.string()).optional(),
  }),
);

export type GetAllJobsDto = z.infer<typeof getAllJobsSchema>;

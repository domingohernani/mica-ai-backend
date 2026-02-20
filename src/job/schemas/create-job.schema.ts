import z, { ZodType } from 'zod';

export const createJobSchema: ZodType<{
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
}> = z.object({
  organizationId: z.uuid(),
  createdBy: z.uuid(),

  // Required fields
  position: z.string().min(1, 'Position is required').max(100),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  description: z.string().min(1, 'Job description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  assignedRecruiter: z.string().min(1, 'Assigned recruiter is required'),

  // Optional fields
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  benefits: z.string().optional(),
  openPositions: z.number().min(1).default(1),
  applicationDeadline: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export type CreateJobDto = z.infer<typeof createJobSchema>;

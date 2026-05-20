import z, { ZodType } from 'zod';

import { JobAvailability } from '../constants/job-availability';

export type ApplicantDetails = {
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  currentAddress: string;
  currentJobTitle: string | null;
  currentCompany: string | null;
  yearsOfExperience: number;
  expectedSalary: number;
  availability: JobAvailability;
  professionalLinks: string | null;
};

export const applicantDetailsSchema: ZodType<ApplicantDetails> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().nullable(),
  dateOfBirth: z.date(),
  email: z.email(),
  phoneNumber: z.string(),
  currentAddress: z.string(),
  currentJobTitle: z.string().nullable(),
  currentCompany: z.string().nullable(),
  yearsOfExperience: z.number(),
  expectedSalary: z.number(),
  availability: z.enum(JobAvailability),
  professionalLinks: z.string().nullable(),
});

export const createApplicationSchema: z.ZodType<{
  details: z.infer<typeof applicantDetailsSchema>;
}> = z.object({
  details: z.preprocess((value: string) => {
    if (typeof value !== 'string') return value;

    try {
      const parsedValue: ApplicantDetails = JSON.parse(value);
      return {
        ...parsedValue,
        dateOfBirth: new Date(parsedValue.dateOfBirth),
      };
    } catch {
      return value;
    }
  }, applicantDetailsSchema),
});

export type ApplicationDto = z.infer<typeof createApplicationSchema>;

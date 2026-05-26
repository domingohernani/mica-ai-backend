import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { JobApplication } from './job-application.entity';

interface Evaluation {
  compatibilityScore: number;
  matchedRequirements: string[];
  missingCoreRequirements: string[];
  alignmentRationale: string;
}

@Entity()
export class ApplicantEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('jsonb')
  evaluation: Evaluation;

  @ManyToOne(
    () => JobApplication,
    (jobApplication: JobApplication) => jobApplication.applicantEvaluation,
  )
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication?: JobApplication;

  @Column('uuid')
  jobApplicationId: string;
}

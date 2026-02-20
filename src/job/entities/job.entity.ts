import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Organization } from '../../organization/entities/organization.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  createdBy: string;

  // Required fields
  @Column()
  position: string;

  @Column()
  department: string;

  @Column()
  location: string;

  @Column()
  employmentType: string;

  @Column()
  experienceLevel: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column()
  assignedRecruiter: string;

  @Column()
  status: string;

  // Optional fields
  @Column({ nullable: true })
  salaryMin?: number;

  @Column({ nullable: true })
  salaryMax?: number;

  @Column({ type: 'text', nullable: true })
  benefits?: string;

  @Column({ default: 1 })
  openPositions: number;

  @Column({ type: 'date', nullable: true })
  applicationDeadline?: string;

  @Column({ type: 'simple-array', nullable: true })
  skills?: string[];

  // Timestamps
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  // This represent the organizationId
  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.jobs,
  )
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Column('uuid')
  organizationId: string;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Organization } from '../../entities/organization.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  createdBy: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  // This represent the organizationId
  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.departments,
  )
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Column('uuid')
  organizationId: string;
}

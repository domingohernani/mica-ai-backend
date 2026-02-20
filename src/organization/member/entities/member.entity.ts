import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Organization } from '../../entities/organization.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId: string;

  @Column()
  role: string;

  @Column({ type: 'timestamp' })
  joinedAt: Date;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.members,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Column('uuid')
  organizationId: string;
}

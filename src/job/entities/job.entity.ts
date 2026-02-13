import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column('uuid')
  organizationId: string;

  @Column()
  position: string;

  @Column('text')
  description: string;

  @Column()
  status: string;

  @Column('uuid')
  createdBy: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}

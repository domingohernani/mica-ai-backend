import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Job {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'string' })
  organizationId: ObjectId;
  @Column()
  position: string;
  @Column()
  description: string;
  @Column()
  status: string;
  @Column({ type: 'string' })
  createdBy: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}

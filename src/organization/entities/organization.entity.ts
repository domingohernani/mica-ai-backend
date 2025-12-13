import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Organization {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  name: string;
  @Column()
  // members: Member[];
  members: {
    userId: ObjectId;
    role: string;
    joinedAt: Date;
  }[];

  @Column({ type: 'string' })
  createdBy: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}

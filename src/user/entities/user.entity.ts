import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id?: ObjectId;
  @Column()
  sub: string;

  @Column()
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  isVerified: boolean;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}

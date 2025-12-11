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
  userName: string;
  @Column()
  isVerified: boolean;
  @Column()
  pictureUrl: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}

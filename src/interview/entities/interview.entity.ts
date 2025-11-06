import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

class ConversationItem {
  id: number;
  originalQuestion: string;
}

@Entity()
export class Interview {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  //   conversation: ConversationItem[];
  answer: string;
}

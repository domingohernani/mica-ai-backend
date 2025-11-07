import {
  Entity,
  ObjectIdColumn,
  Column,
  ObjectId,
  BeforeInsert,
} from 'typeorm';
import { ObjectId as MongoObjectId } from 'mongodb';
@Entity()
export class Interview {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  conversation: {
    _id: ObjectId;
    originalQuestion: string;
    aiQuestion: string;
    answer: string;
    isAnswered: boolean;
  }[];

  @Column({ default: false })
  isDone: boolean;

  @BeforeInsert()
  generateConversation() {
    if (this.conversation) {
      this.conversation = this.conversation.map((convo) => ({
        ...convo,
        _id: convo._id || new MongoObjectId(),
      }));
    }
  }
}

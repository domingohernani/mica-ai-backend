import { Conversation } from './entities/conversation.entity';

export class InterviewDto {
  readonly id: string;
  conversations: Conversation[];
  readonly isDone: boolean;
  readonly finalMessage: string;
  organizationId: string;
  readonly finalTtsSignedUrl?: string;
}

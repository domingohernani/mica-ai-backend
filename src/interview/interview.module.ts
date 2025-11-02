import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';

@Module({
  controllers: [InterviewController, QuestionController],
  providers: [InterviewService],
  imports: [QuestionModule],
})
export class InterviewModule {}

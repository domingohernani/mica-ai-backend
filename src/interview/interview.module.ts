import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Interview } from './entities/interview.entity';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';

@Module({
  controllers: [InterviewController, QuestionController],
  providers: [InterviewService],
  imports: [TypeOrmModule.forFeature([Interview]), QuestionModule],
})
export class InterviewModule {}

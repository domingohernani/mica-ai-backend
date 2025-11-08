import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Interview } from './entities/interview.entity';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { QuestionModule } from './question/question.module';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService],
  exports: [InterviewService],
  imports: [
    TypeOrmModule.forFeature([Interview]),
    forwardRef(() => QuestionModule),
  ],
})
export class InterviewModule {}

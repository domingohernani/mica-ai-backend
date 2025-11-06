import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { InterviewModule } from './interview/interview.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview/entities/interview.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      synchronize: true, // FIXME: remove in production
      entities: [Interview],
    }),
    LlmModule,
    InterviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

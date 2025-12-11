import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { LlmModule } from './infrastructure/llm/llm.module';
import { SpeechModule } from './infrastructure/speech/speech.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { Interview } from './interview/entities/interview.entity';
import { InterviewModule } from './interview/interview.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      synchronize: true, // TODO: remove in production
      entities: [Interview, User],
    }),
    LlmModule,
    InterviewModule,
    SpeechModule,
    StorageModule,
    AuthModule,
    CompanyModule,
    UserModule,
  ],
  controllers: [AppController, AuthController, CompanyController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}

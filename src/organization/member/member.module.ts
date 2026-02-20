import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from './entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  providers: [MemberService],
  controllers: [MemberController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MemberModule {}

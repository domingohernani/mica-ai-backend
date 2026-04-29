import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { Department } from './department/entities/department.entity';
import { Organization } from './entities/organization.entity';
import { Member } from './member/entities/member.entity';
import { MemberModule } from './member/member.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [],
  imports: [
    MemberModule,
    TypeOrmModule.forFeature([Organization, Member, Department, User]),
  ],
})
export class OrganizationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Department } from './department/entities/department.entity';
import { Organization } from './entities/organization.entity';
import { Member } from './member/entities/member.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Organization, Member, Department])],
})
export class OrganizationModule {}

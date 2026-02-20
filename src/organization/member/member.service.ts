import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetDepartmentsParamDto } from '../department/schemas/get-departments-params.schema';
import { Member } from './entities/member.entity';
import { GetAllMembersDto } from './schemas/get-all-members.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly member: Repository<Member>,
  ) {}

  async findAll(param: GetDepartmentsParamDto): Promise<GetAllMembersDto> {
    // Find all departments using organizationId
    const members: Member[] | null = await this.member.find({
      where: {
        organizationId: param.organizationId,
      },
      order: {
        joinedAt: 'DESC',
      },
    });

    return members;
  }
}

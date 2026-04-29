import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetDepartmentsParamDto } from '../department/schemas/get-departments-params.schema';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './schemas/create-member.schema';
import { GetAllMembersDto } from './schemas/get-all-members.schema';
import { type GetMemberDto } from './schemas/get-member.schema';

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
      relations: {
        user: true,
      },
      order: {
        joinedAt: 'DESC',
      },
    });

    return members;
  }

  async create(memberDto: CreateMemberDto): Promise<GetMemberDto> {
    const newMember: GetMemberDto = this.member.create(memberDto);
    // Saves into the database
    return await this.member.save(newMember);
  }
}

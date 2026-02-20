import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetParamDto } from 'src/common/schemas/get-param.schema';
import { Repository } from 'typeorm';

import { Roles } from '../constants/roles';
import now from '../utils/dates/now';
import { Organization } from './entities/organization.entity';
import { Member } from './member/entities/member.entity';
import { CreateOrganizationDto } from './schemas/create-organization.schema';
import { GetOrganizationDto } from './schemas/get-organization.schema';

@Injectable()
export class OrganizationService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Organization)
    private readonly organization: Repository<Organization>,
    @InjectRepository(Member)
    private readonly member: Repository<Member>,
  ) {}

  // Create organization and create a member
  async create(
    userId: string,
    organizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    // reate the organization entity without members
    const newOrganization: Organization = this.organization.create({
      ...organizationDto,
      createdBy: userId,
      createdAt: now(),
      updatedAt: now(),
    });

    // Save the organization first to generate its ID
    const savedOrg: Organization =
      await this.organization.save(newOrganization);

    // Create the owner member
    const ownerMember: Member = this.member.create({
      organization: savedOrg, // link via foreign key
      userId,
      role: Roles.Owner,
      joinedAt: now(),
    });

    // Save the member
    await this.member.save(ownerMember);

    // 5Attach members array for returning
    savedOrg.members = [ownerMember];

    return savedOrg;
  }

  // Get organizations base on user id
  async findByUserId(
    organizationDto: GetParamDto,
  ): Promise<GetOrganizationDto[]> {
    const id: string = organizationDto.id;
    // Find all organizations where the given user is a member
    // This performs an INNER JOIN with the Member table and filters by userId
    const organizations: Organization[] = await this.organization
      .createQueryBuilder('org')
      .innerJoinAndSelect('org.members', 'member')
      .where('member.userId = :id', { id })
      .getMany();

    // Convert the id to string
    const convertedOrganizations: GetOrganizationDto[] = organizations.map(
      (organization: Organization) => ({
        ...organization,
        id: organization.id || '',
      }),
    );

    return convertedOrganizations;
  }
}

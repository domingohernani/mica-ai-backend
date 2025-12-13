import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { GetParamDto } from 'src/common/schemas/get-param.schema';
import { MongoRepository } from 'typeorm';

import { Roles } from '../constants/roles';
import now from '../utils/dates/now';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './schemas/create-organization.schema';
import { GetOrganizationDto } from './schemas/get-organization.schema';

@Injectable()
export class OrganizationService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Organization)
    private readonly organization: MongoRepository<Organization>,
  ) {}

  // Create organization
  async create(organizationDto: CreateOrganizationDto): Promise<Organization> {
    // Adding and modifying necessary properties
    const newOrganizationDto: Organization = {
      ...organizationDto,
      members: [
        {
          userId: new ObjectId(organizationDto.createdBy),
          role: Roles.Owner,
          joinedAt: now(),
        },
      ],
      createdBy: new ObjectId(organizationDto.createdBy),
      createdAt: now(),
      updatedAt: now(),
    };

    const newOrg: Organization = this.organization.create(newOrganizationDto);
    // Return and save into the database
    return await this.organization.save(newOrg);
  }

  // Get organizations base on user id
  async findByUserId(
    organizationDto: GetParamDto,
  ): Promise<GetOrganizationDto[]> {
    const id: ObjectId = new ObjectId(organizationDto._id);
    const organizations: Organization[] = await this.organization.find({
      where: { 'members.userId': id },
    });

    // Check if the organization exist
    if (!organizations.length) {
      throw new NotFoundException(
        `No organization found for ID ${organizationDto._id}.`,
      );
    }

    // Convert the _id to string
    const convertedOrganizations: GetOrganizationDto[] = organizations.map(
      (organization: Organization) => ({
        ...organization,
        _id: organization._id?.toString() || '',
      }),
    );

    return convertedOrganizations;
  }
}

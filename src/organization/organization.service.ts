import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import now from '../utils/dates/now';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './schemas/create-organization.schema';

@Injectable()
export class OrganizationService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Organization)
    private readonly organization: Repository<Organization>,
  ) {}

  // Create organization
  async create(userDto: CreateOrganizationDto): Promise<Organization> {
    // Adding and modifying necessary properties
    const newOrganizationDto: Organization = {
      ...userDto,
      createdBy: new ObjectId(userDto.createdBy),
      createdAt: now(),
      updatedAt: now(),
    };

    const newOrg: Organization = this.organization.create(newOrganizationDto);
    // Return and save into the database
    return await this.organization.save(newOrg);
  }
}

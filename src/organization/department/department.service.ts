import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetParamDto } from '../../common/schemas/get-param.schema';
import now from '../../utils/dates/now';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './schemas/create-department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly department: Repository<Department>,
  ) {}

  // Create department
  async create(
    organizationId: GetParamDto,
    departmentDto: CreateDepartmentDto,
  ): Promise<CreateDepartmentDto> {
    // Create department object
    const newDepartment: Department = this.department.create({
      ...departmentDto,
      organizationId: organizationId.id,
      createdAt: now(),
      updatedAt: now(),
    });
    // Saves into the database
    return await this.department.save(newDepartment);
  }
}

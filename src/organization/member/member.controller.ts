import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import {
  type GetOrganizationParamDto,
  getOrganizationParamSchema,
} from '../schemas/get-organization.param';
import { MemberService } from './member.service';
import { GetAllMembersDto } from './schemas/get-all-members.schema';
@Controller('organizations/:organizationId')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('members')
  @UsePipes(new ZodValidationPipe(getOrganizationParamSchema))
  async findAll(
    @Param() param: GetOrganizationParamDto,
  ): Promise<GetAllMembersDto> {
    return await this.memberService.findAll(param);
  }

  // @Post('members')
  // async create(
  //   @Param(new ZodValidationPipe(getOrganizationParamSchema))
  //   @Param()
  //   param: GetOrganizationParamDto,
  //   @Body(new ZodValidationPipe(createDepartmentSchema))
  //   departmentDto: CreateDepartmentDto,
  // ): Promise<CreateDepartmentDto> {
  //   return await this.departmentService.create(organizationDto, departmentDto);
  // }

  // @Patch('members/:memberId')
  // async update(
  //   @Param(new ZodValidationPipe(departmentParamSchema))
  //   params: DepartmentParamDto,
  //   @Body(new ZodValidationPipe(updateDepartmentSchema))
  //   departmentDto: UpdateDepartmentDto,
  // ): Promise<UpdateDepartmentDto> {
  //   return await this.departmentService.update(params, departmentDto);
  // }

  // @Delete('members/:memberId')
  // async delete(
  //   @Param(new ZodValidationPipe(departmentParamSchema))
  //   departmentParam: DepartmentParamDto,
  // ): Promise<DeleteDepartmentDto> {
  //   return await this.departmentService.delete(departmentParam);
  // }
}

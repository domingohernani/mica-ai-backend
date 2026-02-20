import { Controller, Get, Param, UsePipes } from '@nestjs/common';
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

  //   @Get('locations')
  //   @UsePipes(new ZodValidationPipe(getOrganizationParamSchema))
  //   async findAll(
  //     @Param() organizationDto: GetOrganizationParamDto,
  //   ): Promise<GetAllMembersDto> {
  //     // return await this.memberService.findAll(memberDto);
  //   }

  @Get('members')
  @UsePipes(new ZodValidationPipe(getOrganizationParamSchema))
  async findAll(
    @Param() param: GetOrganizationParamDto,
  ): Promise<GetAllMembersDto> {
    return await this.memberService.findAll(param);
  }
}

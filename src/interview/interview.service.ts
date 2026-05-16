import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetParamDto } from '../common/schemas/get-param.schema';
import { StorageService } from '../infrastructure/storage/storage.service';
import { OrganizationService } from '../organization/organization.service';
import { Interview } from './entities/interview.entity';
import { InterviewDto } from './interview.dto';
import { QuestionDto } from './question/question.dto';

@Injectable()
export class InterviewService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Interview) private interview: Repository<Interview>,
    private storage: StorageService,
    private organization: OrganizationService,
  ) {}

  // Find the right interview using interview ID
  async find(interviewDto: GetParamDto): Promise<InterviewDto> {
    const id: string = interviewDto.id;
    const interview: Interview | null = await this.interview.findOne({
      where: { id: id },
    });

    // Checking if the interview is found. Throws an erorr if not found
    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${id.toString()} not found`,
      );
    }
    const conversations: QuestionDto[] = interview.conversations;

    // Get the Text-to-Speech signed url
    const path: string = `${interviewDto.id}/${conversations.length}/message.mp3`;
    const signedUrl: string = await this.storage.sign(path);

    const convertedInterview: InterviewDto = {
      ...interview,
      finalTtsSignedUrl: signedUrl,
    };

    return convertedInterview;
  }

  async findByOrganizationId(
    organizationDto: GetParamDto,
    interviewDto: GetParamDto,
  ): Promise<InterviewDto> {
    const interview: Interview | null = await this.interview.findOne({
      where: { organizationId: organizationDto.id, id: interviewDto.id },
      relations: ['conversations'],
    });

    // Checking if the interview is found. Throws an erorr if not found
    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${interviewDto.id} not found under organization ID ${organizationDto.id}`,
      );
    }

    return interview;
  }

  // Create an interview document
  async create(
    // TODO: change the GetParamDto to ParamDto, since it is being use on diff methods.
    // This is exist on other services as well.
    param: GetParamDto,
    interviewDto: InterviewDto,
  ): Promise<InterviewDto> {
    // Creating ordered question
    const orderedConversation: QuestionDto[] = interviewDto.conversations.map(
      (convo: QuestionDto, index: number) => ({ ...convo, order: index }),
    );

    await this.organization.find(param);

    interviewDto.conversations = orderedConversation;
    interviewDto.organizationId = param.id;

    const newInterview: Interview = this.interview.create(interviewDto);
    // Saves into the database
    return await this.interview.save(newInterview);
  }

  // Update an inteview document dynamically
  async update<Type, Key extends keyof Type>(
    interviewDto: GetParamDto,
    filter: Record<Key, Type[Key]>,
    updatedValue: Partial<Type>,
  ): Promise<InterviewDto> {
    await this.interview.update(filter, updatedValue);
    // Find the interview using the  dto
    const updatedInterview: InterviewDto = await this.find(interviewDto);
    return updatedInterview;
  }
}

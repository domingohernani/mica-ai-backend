import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { Interview } from './entities/interview.entity';
import { InterviewDto } from './interview.dto';
import { GetInterviewParamDto } from './schemas/get-interview-param.schema';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview) private interview: Repository<Interview>,
  ) {}

  async find(interviewDto: GetInterviewParamDto): Promise<InterviewDto> {
    // Checking if the id is a valid MongoDB id.
    if (!ObjectId.isValid(interviewDto._id)) {
      throw new BadRequestException('Invalid interview ID format.');
    }

    const id = new ObjectId(interviewDto._id);
    const interview = await this.interview.findOne({ where: { _id: id } });
    // Checking if the interview is found.
    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${id.toString()} not found`,
      );
    }
    return interview;
  }

  create(interviewDto: InterviewDto): Promise<InterviewDto> {
    const newInterview = this.interview.create(interviewDto);
    return this.interview.save(newInterview);
  }
}

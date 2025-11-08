import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { GetParamDto } from '../common/schemas/get-param.schema';
import { Interview } from './entities/interview.entity';
import { InterviewDto } from './interview.dto';

@Injectable()
export class InterviewService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Interview) private interview: Repository<Interview>,
  ) {}

  // Find the right interview using interview ID
  async find(interviewDto: GetParamDto): Promise<InterviewDto> {
    const id: ObjectId = new ObjectId(interviewDto._id);
    const interview: InterviewDto | null = await this.interview.findOne({
      where: { _id: id },
    });

    // Checking if the interview is found. Throws an error if not found
    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${id.toString()} not found`,
      );
    }
    return interview;
  }

  // Create an interview document
  create(interviewDto: InterviewDto): Promise<InterviewDto> {
    const newInterview: InterviewDto = this.interview.create(interviewDto);
    // Saves into the database
    return this.interview.save(newInterview);
  }
}

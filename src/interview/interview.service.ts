import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';

import { GetParamDto } from '../common/schemas/get-param.schema';
import { Interview } from './entities/interview.entity';
import { InterviewDto } from './interview.dto';

@Injectable()
export class InterviewService {
  // Inject the Interview repository to perform database operations
  constructor(
    @InjectRepository(Interview) private interview: Repository<Interview>,
    private storage: StorageService,
  ) {}

  // Find the right interview using interview ID
  async find(interviewDto: GetParamDto): Promise<InterviewDto> {
    const id: ObjectId = new ObjectId(interviewDto._id);
    const interview: Interview | null = await this.interview.findOne({
      where: { _id: id },
    });

    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${id.toString()} not found`,
      );
    }

    // Get the Text-to-Speech signed url
    const path: string = `${interviewDto._id.toString()}/${interviewDto._id.toString()}.mp3`;
    const signedUrl: string = await this.storage.sign(path);

    const convertedInterview: InterviewDto = {
      ...interview,
      finalTtsSignedUrl: signedUrl,
    };

    // Checking if the interview is found. Throws an error if not found
    if (!interview) {
      throw new NotFoundException(
        `Interview with ID ${id.toString()} not found`,
      );
    }
    return convertedInterview;
  }

  // Create an interview document
  async create(interviewDto: InterviewDto): Promise<Interview> {
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

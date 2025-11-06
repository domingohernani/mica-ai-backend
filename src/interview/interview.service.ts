import { InterviewDto } from './interview.dto';
import { Injectable } from '@nestjs/common';
import { GetInterviewParamDto } from './schemas/get-interview-param.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview) private interview: Repository<Interview>,
  ) {}

  find(interviewDto: GetInterviewParamDto): Promise<InterviewDto | null> {
    // Now it’s safe to construct
    if (!ObjectId.isValid(interviewDto.id)) {
      throw new Error('error!');
    }
    
    const id = new ObjectId(interviewDto.id);

    return this.interview.findOne({ where: { _id: id } });
    // return this.INTERVIEW.find((interview) => interview.id === interviewDto.id);
  }

  create(interviewDto: InterviewDto): Promise<InterviewDto> {
    const newInterview = this.interview.create(interviewDto);
    return this.interview.save(newInterview);
  }
}

//   conversation: [
//     {
//       originalQuestion: '',
//         aiQuestion: {
//           text: '',
//           audioUrl: '',
//         },
//         intervieweeAnswer: {
//           text: '',
//           videoUrl: '',
//           audioUrl: '',
//         },
//       isDone: false,
//     },
//   ],

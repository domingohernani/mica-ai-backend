import { Injectable } from '@nestjs/common';
import { GetInterviewParamDto } from './schemas/get-interview-param.schema';
// import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class InterviewService {
  private INTERVIEW = [
    {
      id: 1000,
      conversation: [
        {
          id: 1,
          originalQuestion:
            'Can you tell me a little about yourself and your background?',
        },
        {
          id: 2,
          originalQuestion:
            'What do you consider your greatest strengths and weaknesses?',
        },
        {
          id: 3,
          originalQuestion:
            'Can you describe a time when you faced a challenge and how you handled it?',
        },
        {
          id: 4,
          originalQuestion:
            'Why are you interested in this position or company?',
        },
        {
          id: 5,
          originalQuestion: 'Where do you see yourself in the next few years?',
        },
      ],
    },
  ];

  find(interviewDto: GetInterviewParamDto) {
    return this.INTERVIEW.find((interview) => interview.id === interviewDto.id);
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

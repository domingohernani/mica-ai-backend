import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { SpeechService } from 'src/speech/speech.service';
import { StorageService } from 'src/storage/storage.service';

import { SynthesizeResponse } from '../../common/types/tts.types';
import { LlmService } from '../../llm/llm.service';
import {
  generateFirstQuestion,
  generateLastResponse,
  generateQuestion,
} from '../../utils/generate-prompt';
import { InterviewDto } from '../interview.dto';
import { GetParamDto } from './../../common/schemas/get-param.schema';
import { CreateLlmDto } from './../../llm/schemas/create-llm.schema';
import { InterviewService } from './../interview.service';
import { QuestionDto } from './question.dto';
import type { GetQuestionDto } from './schemas/get-question.schema';

@Injectable()
export class QuestionService {
  // For each upload session
  private chunksMap: Map<string, Map<number, Buffer>> = new Map();

  // Inject the Interview repository to perform database operations
  constructor(
    private interview: InterviewService,
    private llm: LlmService,
    private speech: SpeechService,
    private storage: StorageService,
  ) {}

  // Find current unanswered question.
  async find(
    interviewDto: GetParamDto,
  ): Promise<GetQuestionDto | InterviewDto> {
    // Use the find method of interview service.
    const interview: InterviewDto = await this.interview.find(interviewDto);
    const conversation: QuestionDto[] = interview.conversation;

    // Check if all questions are already answered.
    const isAllAnswered: boolean = conversation.every(
      (convo: QuestionDto) => convo.isAnswered,
    );

    // Actual generated AI prompt
    const llmDto: CreateLlmDto = {
      model: 'gemma3:4b',
      prompt: '',
      stream: false,
    };

    // Case where all questions are alread answered.
    if (isAllAnswered) {
      // Eearly return do not recompute
      if (interview.isDone) return interview;

      // Generate custom injected prompt.
      const previousConvo: QuestionDto = conversation[conversation.length - 1];
      const previousQuestion: string = previousConvo.originalQuestion;
      const previousAnswer: string = previousConvo.answer;
      const prompt: string = generateLastResponse(
        previousQuestion,
        previousAnswer,
      );
      llmDto.prompt = prompt;
      // Call LLM to generate question to end the interview
      const generatedQuestion: string = await this.llm.generate(llmDto);

      // Get the Text-to-Speech signed url
      const path: string = `${interviewDto._id.toString()}/${conversation.length}/message.mp3`;
      const signedUrl: string = await this.storage.sign(path);

      // Get a buffer file and save to Google Cloud.
      const bufferFile: SynthesizeResponse =
        await this.speech.synthesize(generatedQuestion);
      await this.storage.upload(bufferFile.audioContent as Buffer, path);

      // Update isDone and finalMessage field.
      await this.interview.update<InterviewDto, '_id'>(
        interviewDto,
        { _id: new ObjectId(interviewDto._id) },
        {
          isDone: true,
          finalMessage: generatedQuestion,
        },
      );

      const newInterview: InterviewDto = {
        ...interview,
        finalTtsSignedUrl: signedUrl,
      };

      return newInterview;
    }

    // Get the current unanswered question. If undefined, it returns null, meaning
    // all questions are answered, so proceed to calculation.
    const currentQuestion: QuestionDto | null =
      conversation.find((convo: QuestionDto) => !convo.isAnswered) ?? null;

    // Null check
    if (!currentQuestion) {
      throw new NotFoundException(
        `No questions remaining for interview with ID ${interviewDto._id}.`,
      );
    }

    // Get the index of the current question.
    const currentQuestionIndex: number = conversation.findIndex(
      (convo: QuestionDto) =>
        convo._id.toString() === currentQuestion._id.toString(),
    );

    // Get the Text-to-Speech signed url
    const path: string = `${interviewDto._id.toString()}/${currentQuestionIndex}/ai-question.mp3`;
    const signedUrl: string = await this.storage.sign(path);

    // Check if there's already AI generated response/question.
    if (currentQuestion.aiQuestion) {
      const response: GetQuestionDto = {
        aiQuestion: currentQuestion.aiQuestion,
        aiTtsSignedUrl: signedUrl,
        _id: currentQuestion._id.toString(),
      };
      return response;
    }

    // Check if the current question is the first question.
    // Injected prompt is a bit different on first, middle, and last question.
    if (currentQuestionIndex === 0) {
      // Generate custom injected prompt.
      const prompt: string = generateFirstQuestion(
        currentQuestion.originalQuestion,
      );
      llmDto.prompt = prompt;
    } else {
      // Generate custom injected prompt.
      // Get the previous interaction to for the LLM to analyze.
      const previousConvo: QuestionDto = conversation[currentQuestionIndex - 1];
      const previousQuestion: string = previousConvo.originalQuestion;
      const previousAnswer: string = previousConvo.answer;
      const nextQuestion: string = currentQuestion.originalQuestion;

      const prompt: string = generateQuestion(
        previousQuestion,
        previousAnswer,
        nextQuestion,
      );
      llmDto.prompt = prompt;
    }

    // Call LLM to generate question.
    const generatedQuestion: string = await this.llm.generate(llmDto);
    // Get a buffer file and save to Google Cloud.
    const bufferFile: SynthesizeResponse =
      await this.speech.synthesize(generatedQuestion);
    await this.storage.upload(bufferFile.audioContent as Buffer, path);

    const newQuestion: QuestionDto = {
      _id: currentQuestion._id,
      originalQuestion: currentQuestion.originalQuestion,
      aiQuestion: generatedQuestion,
      answer: '',
      isAnswered: false,
    };
    // Update current conversation/question
    await this.update(
      interviewDto,
      { _id: currentQuestion._id.toString() },
      newQuestion,
    );

    // Attach the generated question to the current question
    const newCurrentQuestion: GetQuestionDto = {
      aiQuestion: generatedQuestion,
      aiTtsSignedUrl: signedUrl,
      _id: currentQuestion._id.toString(),
    };
    return newCurrentQuestion;
  }

  // Update interview question
  async update(
    interviewId: GetParamDto,
    questionId: GetParamDto,
    question: QuestionDto,
  ): Promise<QuestionDto[]> {
    // Use the find() method of interview service repository.
    const interview: InterviewDto = await this.interview.find(interviewId);
    const conversation: QuestionDto[] = interview.conversation;

    // Modify the specific question or converstation
    const updatedConversation: QuestionDto[] = conversation.map(
      (_question: QuestionDto) => {
        if (_question._id.toString() == questionId._id.toString()) {
          return question;
        }
        return _question;
      },
    );

    // Update the conversation in the database using interview repository
    await this.interview.update<InterviewDto, '_id'>(
      interviewId,
      { _id: new ObjectId(interviewId._id) },
      { conversation: updatedConversation },
    );

    return updatedConversation;
  }

  // Handle files, transcribe audio, store them in GCS, mark question answered (more specific operation)
  async updateAndTransribe(
    interviewDto: GetParamDto,
    questionDto: GetParamDto,
    videoBuffer: Buffer,
  ): Promise<GetQuestionDto | InterviewDto> {
    // Use the find method of interview service.
    const interview: InterviewDto = await this.interview.find(interviewDto);
    const conversation: QuestionDto[] = interview.conversation;

    // Get the current unanswered question.
    const currentQuestion: QuestionDto | null =
      conversation.find((convo: QuestionDto) => !convo.isAnswered) ?? null;

    // Null check
    if (!currentQuestion) {
      throw new NotFoundException(
        `No questions remaining for interview with ID ${interviewDto._id}.`,
      );
    }

    // Get the index of the current question.
    const currentQuestionIndex: number = conversation.findIndex(
      (convo: QuestionDto) =>
        convo._id.toString() === currentQuestion._id.toString(),
    );

    const rawPath: string = `${interviewDto._id.toString()}/${currentQuestionIndex}`;
    const videoPath: string = rawPath.concat('/video-answer.webm');
    const bucketName: string = 'recorded-temp';

    // Store the mp4
    await this.storage.upload(videoBuffer, videoPath);

    // Transcribe the mp4
    const uri: string = `gs://${bucketName}/${videoPath}`;
    const answerTranscription: string | undefined =
      await this.speech.transcribe(uri);

    if (!answerTranscription) {
      throw new InternalServerErrorException('Video transcription failed.');
    }

    // Update fields the specific question or converstation
    const updatedConversation: QuestionDto[] = conversation.map(
      (_question: QuestionDto) => {
        if (_question._id.toString() == questionDto._id.toString()) {
          return {
            _id: currentQuestion._id,
            originalQuestion: currentQuestion.originalQuestion,
            aiQuestion: currentQuestion.aiQuestion,
            answer: answerTranscription,
            isAnswered: true,
          };
        }
        return _question;
      },
    );

    // Update the conversation in the database using interview repository
    await this.interview.update<InterviewDto, '_id'>(
      interviewDto,
      { _id: new ObjectId(interviewDto._id) },
      { conversation: updatedConversation },
    );

    // Call and return the latest unanswered question
    return await this.find(interviewDto);
  }

  async updateByChunk(
    interviewDto: GetParamDto,
    questionDto: GetParamDto,
    chunkNumber: number,
    chunk: Express.Multer.File,
    isLastChunk: boolean,
  ): Promise<void> {
    const inteviewId: string = interviewDto._id.toString();
    const questionId: string = questionDto._id.toString();
    // Initialize map for this question if it doesn't exist
    if (!this.chunksMap.has(questionId)) {
      this.chunksMap.set(questionId, new Map<number, Buffer>());
    }

    // Get the map for this question
    const questionChunks: Map<number, Buffer> | undefined =
      this.chunksMap.get(questionId);

    if (!questionChunks) {
      throw new InternalServerErrorException(
        `Failed to get the chunk storage for interview with ID ${inteviewId} at question with ID ${questionId}`,
      );
    }
    // Store the chunk in the map using chunkNumber as key
    questionChunks.set(chunkNumber, chunk.buffer);

    // Check if last chunk
    if (isLastChunk) {
      // Sort chunks by chunkNumber and combine
      const orderedChunks: Buffer[] = Array.from(questionChunks.keys())
        .sort((a: number, b: number) => a - b)
        .map((key: number) => {
          const chunk: Buffer | undefined = questionChunks.get(key);
          if (!chunk) throw new Error(`Missing chunk ${key}`);
          return chunk;
        });
      const finalBuffer: Buffer = Buffer.concat(orderedChunks);

      // Trigger your existing processing pipeline
      await this.updateAndTransribe(interviewDto, questionDto, finalBuffer);

      // Clean up
      this.chunksMap.delete(questionId);
    }
  }
}

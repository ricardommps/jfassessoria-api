import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { TrainingEntity } from './entities/training.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProgramService } from '../program/program.service';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';
import { SendTrainingDto } from './dtos/sendTraining.dto';

export interface SendSuccess {
  status: number;
  message: string;
}

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,

    @Inject(forwardRef(() => ProgramService))
    private readonly programService: ProgramService,
  ) {}

  async findTrainingsByProgramId(programId: number): Promise<TrainingEntity[]> {
    const programs = await this.trainingRepository.find({
      where: {
        programId,
      },
      order: { datePublished: 'ASC' },
    });

    return programs;
  }

  async createTraining(
    createTrainingDto: CreateTrainingDto,
  ): Promise<TrainingEntity> {
    await this.programService.findProgramById(createTrainingDto.programId);
    return this.trainingRepository.save({
      ...createTrainingDto,
    });
  }

  async cloneTraining(
    createTrainingDto: CreateTrainingDto,
    programId: number,
  ): Promise<TrainingEntity> {
    const result = await this.trainingRepository.save({
      ...createTrainingDto,
      id: programId,
    });
    return result;
  }

  async findTrainingById(trainingId: number): Promise<TrainingEntity> {
    const training = await this.trainingRepository.findOne({
      where: {
        id: trainingId,
      },
    });
    if (!training) {
      throw new NotFoundException(`Training id: ${trainingId} not found`);
    }
    return training;
  }

  async updateTraining(
    updateTraining: UpdateTrainingDto,
    trainingId: number,
  ): Promise<TrainingEntity> {
    const training = await this.findTrainingById(trainingId);

    return this.trainingRepository.save({
      ...training,
      ...updateTraining,
    });
  }

  async sendTraining(sendTrainingDto: SendTrainingDto): Promise<SendSuccess> {
    await sendTrainingDto.programsId.map(async (item) => {
      const saveTraining = {
        ...sendTrainingDto,
        programId: item,
      };
      delete saveTraining.programsId;
      await this.programService.findProgramById(saveTraining.programId);
      return this.trainingRepository.save({
        ...saveTraining,
      });
    });
    return {
      status: 200,
      message: 'Send Success',
    };
  }

  async deleteTraining(trainingId: number): Promise<DeleteResult> {
    await this.findTrainingById(trainingId);
    return this.trainingRepository.delete({ id: trainingId });
  }

  async hideTraining(trainingId: number): Promise<TrainingEntity> {
    const training = await this.findTrainingById(trainingId);
    training.hide = true;
    return this.trainingRepository.save({
      ...training,
    });
  }
}

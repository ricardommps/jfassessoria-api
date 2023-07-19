import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { TrainingEntity } from './entities/training.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramService } from 'src/program/program.service';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';

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
      order: { createdAt: 'ASC' },
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
}

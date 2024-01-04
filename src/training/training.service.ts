import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { FinishedTrainingEntity } from '../finished-training/entities/finished-training.entity';
import { ProgramService } from '../program/program.service';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { SendTrainingDto } from './dtos/sendTraining.dto';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';
import { TrainingEntity } from './entities/training.entity';

export interface SendSuccess {
  status: number;
  message: string;
}

interface CloneItem {
  training: CreateTrainingDto;
  qnt: number;
}

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,

    @Inject(forwardRef(() => ProgramService))
    private readonly programService: ProgramService,

    @InjectDataSource() private dataSource: DataSource,
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

  async findTrainingsNotFinished(programId: number): Promise<TrainingEntity[]> {
    const programs = await this.trainingRepository.find({
      where: {
        programId,
        finished: false,
      },
      order: { datePublished: 'ASC' },
    });

    return programs;
  }

  async findTrainingsFinished(programId: number): Promise<TrainingEntity[]> {
    const programs = await this.trainingRepository.find({
      where: {
        programId,
        finished: true,
      },
      order: { datePublished: 'ASC' },
    });

    return programs;
  }

  async findTrainingsByProgramIdQueryBuilder(
    programId: number,
  ): Promise<TrainingEntity[]> {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(
        'training.id, training.name, training.datePublished, training.trainingDateOther, training.description',
      )
      .addSelect('array_to_json(array_agg(finished)) as finished')
      .from(TrainingEntity, 'training')
      .leftJoin(
        FinishedTrainingEntity,
        'finished',
        'training.id = finished.training_id',
      )
      .where('training.program_id= :programId', { programId: programId })
      .orderBy('training.datePublished', 'ASC')
      .groupBy('training.id');

    const trainings = await qb.getRawMany();
    return trainings;
  }

  async createTraining(
    createTrainingDto: CreateTrainingDto,
  ): Promise<TrainingEntity> {
    await this.programService.findProgramById(createTrainingDto.programId);
    return this.trainingRepository.save({
      ...createTrainingDto,
    });
  }

  async cloneTraining(cloneItem: CloneItem): Promise<DeleteResult> {
    const createTrainingDto: CreateTrainingDto = cloneItem.training;
    await this.programService.findProgramById(createTrainingDto.programId);
    const features: CreateTrainingDto[] = [];
    for (let i = 0; i < cloneItem.qnt; i++) {
      features.push(createTrainingDto);
    }
    await this.trainingRepository.save(features);
    return {
      raw: [],
      affected: cloneItem.qnt,
    };
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

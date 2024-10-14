import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FinishedTrainingService } from 'src/finished-training/finished-training.service';
import { MediaEntity } from 'src/media/entities/media.entity';
import { DataSource, DeleteResult, In, Repository } from 'typeorm';
import { FinishedTrainingEntity } from '../finished-training/entities/finished-training.entity';
import { ProgramService } from '../program/program.service';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { SendTrainingDto } from './dtos/sendTraining.dto';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';
import { TrainingEntity } from './entities/training.entity';
import { SendTrainingProps, TrainingProps } from './training.controller';

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

    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>, // Inject Course repository

    @Inject(forwardRef(() => ProgramService))
    private readonly programService: ProgramService,

    @Inject(forwardRef(() => FinishedTrainingService))
    private readonly finishedTrainingService: FinishedTrainingService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async findTrainingsByProgramId(programId: number): Promise<TrainingEntity[]> {
    const trainings = await this.trainingRepository.find({
      where: {
        programId,
      },
      order: { datePublished: 'ASC' },
    });

    return trainings;
  }

  async findTrainingsByIdQueryBuilder(
    programId: number,
  ): Promise<TrainingEntity[]> {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['training.*', 'finished.review'])
      .from(TrainingEntity, 'training')
      .leftJoin(
        FinishedTrainingEntity,
        'finished',
        'training.id = finished.training_id',
      )
      .where('training.program_id= :programId', { programId: programId })
      .orderBy('training.datePublished', 'ASC');

    const trainings = await qb.getRawMany();
    return trainings;
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
        'training.id, training.name, training.subtitle, training.datePublished, training.trainingDateOther, training.description, training.heating, training.recovery, training.tags',
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

  async updateTrainingWithMedias(
    id: number,
    trainigeData: Partial<TrainingEntity>,
  ): Promise<TrainingEntity> {
    const medias = await this.mediaRepository.findBy({
      id: In(trainigeData.medias),
    });

    if (medias.length !== medias.length) {
      throw new Error('One or more medias not found');
    }
    trainigeData.id = id;
    trainigeData.medias = medias;
    await this.trainingRepository.save({ ...trainigeData });
    return this.getTrainingById(id);
  }

  async createTrainingWithMedias(
    training: CreateTrainingDto,
    mediasIds: number[],
  ): Promise<TrainingEntity> {
    const trainingCreate = this.trainingRepository.create(training);
    try {
      const medias = await this.mediaRepository.findBy({ id: In(mediasIds) });

      if (medias.length !== medias.length) {
        throw new Error('One or more medias not found');
      }
      trainingCreate.programId = training.programId;
      trainingCreate.medias = medias;
      return this.trainingRepository.save(trainingCreate);
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
  }

  async cloneTrainingWithMedias(
    id: number,
    qntCopy: number,
  ): Promise<CreateTrainingDto[] & TrainingEntity[]> {
    try {
      const training = await this.getTrainingById(id);
      delete training.id;
      training.datePublished = null;
      training.published = false;
      training.finished = false;
      const features: CreateTrainingDto[] = [];
      for (let i = 0; i < qntCopy; i++) {
        features.push(training);
      }
      return await this.trainingRepository.save(features);
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
  }

  async cloneTraining(cloneItem: CloneItem): Promise<DeleteResult> {
    // const training = await this.findTrainingById(cloneItem.training);
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

  async getTrainingById(id: number): Promise<TrainingEntity> {
    return this.trainingRepository.findOne({
      where: { id },
      relations: ['medias'],
    });
  }

  async trainingById(id: number, userId): Promise<TrainingProps> {
    const training = await this.trainingRepository.findOne({
      where: { id },
      relations: ['medias'],
    });

    if (!training) {
      throw new NotFoundException(`Training id: ${id} not found`);
    }

    const programId = training.programId;

    const program = await this.programService.findProgramById(programId);
    if (program.customerId !== userId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Not authorized',
        },
        403,
      );
    }

    const trainigData = {
      training,
      type: program.type,
    };
    return trainigData;
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

  async sendTrainingTrainingWithMedias(
    sendTrainingDto: SendTrainingProps,
  ): Promise<any> {
    try {
      const { trainingId, programsId } = sendTrainingDto;
      const training = await this.getTrainingById(trainingId);
      delete training.id;
      training.datePublished = null;
      training.published = false;
      training.finished = false;
      await programsId.map(async (item) => {
        const saveTraining = {
          ...training,
          programId: item,
        };
        await this.programService.findProgramById(saveTraining.programId);
        return this.trainingRepository.save({
          ...saveTraining,
        });
      });
      return {
        status: 200,
        message: 'Send Success',
      };
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
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

  async deleteTrainingWithMedias(id: number): Promise<TrainingEntity> {
    const training = await this.findTrainingById(id);
    return await this.trainingRepository.remove(training);
  }

  async hideTraining(trainingId: number): Promise<TrainingEntity> {
    const training = await this.findTrainingById(trainingId);
    training.hide = true;
    return this.trainingRepository.save({
      ...training,
    });
  }
}

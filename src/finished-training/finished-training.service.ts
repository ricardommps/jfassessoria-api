import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TrainingFeedbackEntity } from 'src/training_feedback/entities/training_feedback.entity';
import { DataSource, Repository } from 'typeorm';
import { ProgramEntity } from '../program/entities/program.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { TrainingService } from '../training/training.service';
import { CreateFinishedTrainingDto } from './dtos/createFinishedTraining.dto';
import { FinishedTrainingEntity } from './entities/finished-training.entity';

export interface Finished {
  finishedTrainingEntity: FinishedTrainingEntity[];
  program: ProgramEntity;
  training: TrainingEntity;
}

@Injectable()
export class FinishedTrainingService {
  constructor(
    @InjectRepository(FinishedTrainingEntity)
    private readonly finishedTrainingEntityRepository: Repository<FinishedTrainingEntity>,

    @Inject(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getAllFinished(): Promise<FinishedTrainingEntity[]> {
    return this.finishedTrainingEntityRepository.find();
  }

  async createFinished(
    createFinishedTrainingDto: CreateFinishedTrainingDto,
  ): Promise<FinishedTrainingEntity> {
    const training = await this.trainingService.findTrainingById(
      createFinishedTrainingDto.trainingId,
    );

    training.finished = true;
    await this.trainingService.updateTraining(training, training.id);

    return this.finishedTrainingEntityRepository.save({
      ...createFinishedTrainingDto,
    });
  }

  async updateFinishedTraining(
    updateFinishedTrainingDto: CreateFinishedTrainingDto,
  ): Promise<FinishedTrainingEntity> {
    const finishedTraining = await this.findById(updateFinishedTrainingDto.id);

    return this.finishedTrainingEntityRepository.save({
      ...finishedTraining,
      ...updateFinishedTrainingDto,
    });
  }

  async findFinishedById(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['*', 'tra.name AS training_name', 'pro.name AS program_name'])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('finished_training.id= :trainingId', { trainingId: id });

    const finishedTraining = await qb.getRawOne();
    return finishedTraining;
  }

  async findById(id: number): Promise<FinishedTrainingEntity> {
    const finishedTraining =
      await this.finishedTrainingEntityRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!finishedTraining) {
      throw new NotFoundException(`FinishedTrainingId: ${id} Not Found`);
    }
    return finishedTraining;
  }

  async findFinishedByProgramId(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'finished_training.*',
        'tra.name as trainingName',
        'tra.description as trainingDesc',
        'tra.date_published',
        'tra.id as trainingId',
        'fed.description_feedback',
        'fed.paces',
        'fed.viewed',
      ])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .leftJoin(
        TrainingFeedbackEntity,
        'fed',
        'finished_training.id = fed.finished_training_id',
      )
      .where('tra.program_id= :programId', { programId: id });

    const finishedTraining = await qb.getRawMany();
    return finishedTraining;
  }

  async findFinishedByReview(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'tra.id as trainingId',
        'tra.program_id',
        'tra.name as trainingName',
        'tra.description as tariningDesc',
        'tra.date_published as trainingPublished',
        'tra.training_date_other',
        'finished_training.id as finishedId',
      ])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('pro.customer_id= :customerId', { customerId: id })
      .andWhere('finished_training.review is not true');

    const finishedTraining = await qb.getRawMany();
    return finishedTraining;
  }

  async findFinishedReviewDone(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'tra.id as trainingId',
        'tra.program_id',
        'tra.name as trainingName',
        'tra.description as tariningDesc',
        'tra.date_published as trainingPublished',
        'tra.training_date_other',
        'finished_training.id as finishedId',
      ])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('pro.customer_id= :customerId', { customerId: id })
      .andWhere('finished_training.review is true');

    const finishedTraining = await qb.getRawMany();
    return finishedTraining;
  }

  async findFinishedReviewById(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'finished_training.id as finishedId',
        'finished_training.distance as distance',
        'finished_training.duration as duration',
        'finished_training.pace as pace',
        'finished_training.rpe as rpe',
        'finished_training.trimp as trimp',
        'finished_training.link as link',
        'tra.id as trainingId',
        'tra.program_id',
        'tra.name as trainingName',
        'tra.description as tariningDesc',
        'tra.date_published as trainingPublished',
        'tra.training_date_other',
        'fe.id as feedbackId',
        'fe.finished_training_id',
        'fe.description_feedback as descriptionFeedback',
        'fe.paces as paces',
      ])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .leftJoin(
        TrainingFeedbackEntity,
        'fe',
        'finished_training.id = fe.finished_training_id',
      )
      .where('finished_training.id= :id', { id: id });
    const finishedTraining = await qb.getRawOne();
    return finishedTraining;
  }

  async findFinishedByCustomerId(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['*', 'tra.name AS training_name', 'pro.name AS program_name'])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('finished_training.id= :trainingId', { trainingId: id })
      .andWhere(`DATE_TRUNC('month', "pro.reference_month") = :month`, {
        date: new Date(),
      });

    const finishedTraining = await qb.getRawOne();
    return finishedTraining;
  }
}

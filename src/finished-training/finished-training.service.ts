import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ProgramService } from 'src/program/program.service';
import { TrainingFeedbackService } from 'src/training_feedback/training_feedback.service';
import { DataSource, Repository } from 'typeorm';
import { ProgramEntity } from '../program/entities/program.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { TrainingService } from '../training/training.service';
import { TrainingFeedbackEntity } from '../training_feedback/entities/training_feedback.entity';
import { CreateFinishedTrainingDto } from './dtos/createFinishedTraining.dto';
import { FinishedTrainingEntity } from './entities/finished-training.entity';

export interface Finished {
  finishedTrainingEntity: FinishedTrainingEntity[];
  program: ProgramEntity;
  training: TrainingEntity;
}

export interface FinishedProps {
  finished: FinishedTrainingEntity;
  program: ProgramEntity;
  training: TrainingEntity;
  feedback?: TrainingFeedbackEntity;
}

@Injectable()
export class FinishedTrainingService {
  constructor(
    @InjectRepository(FinishedTrainingEntity)
    private readonly finishedTrainingEntityRepository: Repository<FinishedTrainingEntity>,

    @Inject(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,

    @Inject(forwardRef(() => ProgramService))
    private readonly programService: ProgramService,

    @Inject(forwardRef(() => TrainingFeedbackService))
    private readonly trainingFeedbackService: TrainingFeedbackService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getAllFinished(): Promise<FinishedTrainingEntity[]> {
    return this.finishedTrainingEntityRepository.find();
  }

  async createFinished(
    createFinishedTrainingDto: CreateFinishedTrainingDto,
  ): Promise<FinishedTrainingEntity> {
    try {
      const training = await this.trainingService.findTrainingById(
        createFinishedTrainingDto.trainingId,
      );

      training.finished = true;
      await this.trainingService.updateTraining(training, training.id);
      return this.finishedTrainingEntityRepository.save({
        ...createFinishedTrainingDto,
        training,
      });
    } catch (error) {
      throw error;
    }
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

  async findByTrainingId(id: number): Promise<FinishedTrainingEntity> {
    const finishedTraining =
      await this.finishedTrainingEntityRepository.findOne({
        where: {
          trainingId: id,
        },
      });

    return finishedTraining;
  }

  async findFinishedByProgramId(id) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'finished_training.*',
        'tra.name as trainingName',
        'tra.subtitle as trainingSubtitle',
        'tra.description as trainingDesc',
        'tra.date_published',
        'tra.id as trainingId',
        'fed.description_feedback',
        'fed.paces',
        'fed.viewed',
        'fed.id as feedbackId',
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
      .where('tra.program_id= :programId', { programId: id })
      .orderBy('tra.datePublished', 'DESC');
    const finishedTraining = await qb.getRawMany();
    return finishedTraining;
  }

  async findFinished(userId, timestampFrom, timestampTo) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        'finished_training.*',
        'tra.name as trainingName',
        'tra.subtitle as trainingSubtitle',
        'tra.description as trainingDesc',
        'tra.date_published as trainingDatePublished',
        'tra.id as trainingId',
        'fed.description_feedback',
        'fed.created_at as feedbackCreated',
        'fed.paces',
        'fed.viewed',
        'fed.id as feedbackId',
        'pro.name as programName',
        'pro.type as type',
        'pro.goal as goal',
        'pro.pv as pv',
        'pro.pace as programpace',
        'pro.difficulty_level as difficulty',
        'pro.reference_month as month',
        'pro.id as programId',
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
      .leftJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('pro.customer_id= :customerId', { customerId: userId })
      .andWhere('finished_training.created_at<=:timestampFrom', {
        timestampFrom: timestampFrom,
      })
      .andWhere('finished_training.created_at>:timestampTo', {
        timestampTo: timestampTo,
      })
      .orderBy('finished_training.created_at', 'DESC');
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
        'tra.subtitle as trainingSubtitle',
        'tra.description as tariningDesc',
        'tra.date_published as trainingPublished',
        'tra.training_date_other',
        'finished_training.id as finishedId',
        'finished_training.unrealized as unrealized',
      ])
      .from(FinishedTrainingEntity, 'finished_training')
      .innerJoin(
        TrainingEntity,
        'tra',
        'finished_training.training_id = tra.id',
      )
      .innerJoin(ProgramEntity, 'pro', 'tra.program_id = pro.id')
      .where('pro.customer_id= :customerId', { customerId: id })
      .andWhere('finished_training.review is not true')
      .orderBy('finished_training.created_at', 'DESC');

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
        'tra.subtitle as trainingSubtitle',
        'tra.description as tariningDesc',
        'tra.date_published as trainingPublished',
        'tra.training_date_other',
        'finished_training.unrealized as unrealized',
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
      .andWhere('finished_training.review is true')
      .orderBy('finished_training.created_at', 'DESC');

    const finishedTraining = await qb.getRawMany();
    return finishedTraining;
  }

  async finishedByTrainingId(id: number): Promise<FinishedProps> {
    const training = await this.trainingService.getTrainingById(id);

    if (!training) {
      throw new NotFoundException(`training not found`);
    }

    const finished = await this.finishedTrainingEntityRepository.findOne({
      where: { trainingId: training.id },
    });

    if (!finished) {
      throw new NotFoundException(`finished not found`);
    }

    const program = await this.programService.findProgramById(
      training.programId,
    );

    if (!program) {
      throw new NotFoundException(`program not found`);
    }

    const feedback = await this.trainingFeedbackService.findByTrainingId(
      finished.id,
    );

    return {
      finished,
      training,
      program,
      feedback,
    };
  }

  async finishedById(id: number): Promise<FinishedProps> {
    const finished = await this.finishedTrainingEntityRepository.findOne({
      where: { id },
    });

    if (!finished) {
      throw new NotFoundException(`Training id: ${id} not found`);
    }

    const training = await this.trainingService.getTrainingById(
      finished.trainingId,
    );

    const program = await this.programService.findProgramById(
      training.programId,
    );
    const feedback = await this.trainingFeedbackService.findByTrainingId(
      finished.id,
    );

    return {
      finished,
      training,
      program,
      feedback,
    };
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
        'finished_training.comments as comments',
        'finished_training.unrealized as unrealized',
        'finished_training.unitmeasurement as unitmeasurement',
        'finished_training.typetraining as typetraining',
        'finished_training.intensities as intensities',
        'finished_training.distance_in_meters as distanceInMeters',
        'finished_training.duration_in_seconds as durationInSeconds',
        'finished_training.pace_in_seconds as paceInSeconds',
        'tra.id as trainingId',
        'tra.program_id',
        'tra.name as trainingName',
        'tra.subtitle as trainingSubtitle',
        'tra.heating as trainingHeating',
        'tra.recovery as trainingRecovery',
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

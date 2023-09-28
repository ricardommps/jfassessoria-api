import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { TrainingEntity } from 'src/training/entities/training.entity';
import { TrainingService } from 'src/training/training.service';
import { DataSource, Repository } from 'typeorm';
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
    await this.trainingService.findTrainingById(
      createFinishedTrainingDto.trainingId,
    );
    return this.finishedTrainingEntityRepository.save({
      ...createFinishedTrainingDto,
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

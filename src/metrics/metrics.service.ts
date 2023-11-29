import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { FinishedTrainingEntity } from 'src/finished-training/entities/finished-training.entity';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { TrainingEntity } from 'src/training/entities/training.entity';
import { TrainingFeedbackEntity } from 'src/training_feedback/entities/training_feedback.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateMetricsDto } from './dtos/createMetrics.dto';
import { MetricsEntity } from './entities/metrics.entity';
@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(MetricsEntity)
    private readonly metricsRepository: Repository<MetricsEntity>,
    private readonly customersService: CustomersService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getDataMetricsPhysiological(id, startDate, endDate) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['*'])
      .from(ProgramEntity, 'program')
      .where('program.customer_id= :customerId', { customerId: id })
      .andWhere(`program.reference_month::date >= '${startDate}'`)
      .andWhere(`program.reference_month::date <= '${endDate}'`)
      .andWhere('program.hide= :hide', { hide: false })
      .orderBy('program.reference_month', 'ASC');
    const metrics = await qb.getRawMany();
    return metrics;
  }

  async findPerformanceMetrics(id, startDate, endDate, module) {
    let selectItem = [];
    if (module === 'COMPETICAO') {
      selectItem = [
        'training.date_published',
        'training.id as id',
        'ft.distance as distance',
        'ft.pace as pace',
      ];
    } else {
      selectItem = ['training.date_published', 'training.id as id', 'tf.paces'];
    }
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([...selectItem])
      .from(TrainingEntity, 'training')
      .innerJoin(ProgramEntity, 'pro', 'pro.id = training.program_id')
      .leftJoin(FinishedTrainingEntity, 'ft', 'ft.training_id = training.id')
      .leftJoin(TrainingFeedbackEntity, 'tf', 'tf.finished_training_id = ft.id')
      .where('pro.customer_id= :customerId', { customerId: id })
      .andWhere('ft.review is true')
      .andWhere('training.name= :module', { module: module })
      .andWhere("tf.paces not in ('{}')")
      .andWhere(`date_published::date >= '${startDate}'`)
      .andWhere(`date_published::date <= '${endDate}'`)
      .orderBy('training.datePublished', 'ASC');
    const metrics = await qb.getRawMany();
    return metrics;
  }

  async findMetricsByCustomerId(customerId: number): Promise<MetricsEntity[]> {
    const metrics = await this.metricsRepository.find({
      where: {
        customerId,
      },
      order: { createdAt: 'ASC' },
    });

    return metrics;
  }

  async createMetrics(
    createMetricsDto: CreateMetricsDto,
  ): Promise<MetricsEntity> {
    await this.customersService.findCustomerById(createMetricsDto.customerId);
    return this.metricsRepository.save({
      ...createMetricsDto,
    });
  }
}

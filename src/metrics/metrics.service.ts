import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { FinishedTrainingEntity } from '../finished-training/entities/finished-training.entity';
import { ProgramEntity } from '../program/entities/program.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { TrainingFeedbackEntity } from '../training_feedback/entities/training_feedback.entity';
import { CreateMetricsDto } from './dtos/createMetrics.dto';
import { UpdateMetricsDto } from './dtos/updateMetric.dto';
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
      order: { updatedAt: 'DESC' },
    });

    return metrics;
  }

  async findMetricsById(id: number): Promise<MetricsEntity[]> {
    const metrics = await this.metricsRepository.find({
      where: {
        id,
      },
    });
    return metrics;
  }

  async findMetricById(id: number): Promise<MetricsEntity> {
    const metric = await this.metricsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!metric) {
      throw new NotFoundException(`Metric id: ${metric} not found`);
    }
    return metric;
  }

  async createMetrics(
    createMetricsDto: CreateMetricsDto,
  ): Promise<MetricsEntity> {
    await this.customersService.findCustomerById(createMetricsDto.customerId);
    return this.metricsRepository.save({
      ...createMetricsDto,
    });
  }

  async updateMetric(
    updateMetricsDto: UpdateMetricsDto,
    id: number,
  ): Promise<MetricsEntity> {
    const metric = await this.findMetricById(id);
    return this.metricsRepository.save({
      ...metric,
      ...updateMetricsDto,
    });
  }

  async deleteMetric(id: number): Promise<DeleteResult> {
    await this.findMetricById(id);
    return this.metricsRepository.delete({ id: id });
  }
}

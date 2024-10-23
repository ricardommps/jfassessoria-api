import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { PerformanceMetricsEntity } from './entities/performance_metrics.entity';

@Injectable()
export class PerformanceMetricsService {
  constructor(
    @InjectRepository(PerformanceMetricsEntity)
    private readonly performanceMetricsService: Repository<PerformanceMetricsEntity>,

    private readonly customersService: CustomersService,
  ) {}

  async creatPerformanceMetrics(payload) {
    await this.customersService.findCustomerById(payload.customerId);
    return this.performanceMetricsService.save({
      ...payload,
    });
  }

  async getPerformanceMetricsByCustomerId(customerId: number) {
    const performanceMetrics = await this.performanceMetricsService.find({
      where: {
        customerId,
      },
      order: { createdAt: 'DESC' },
    });

    return performanceMetrics;
  }

  async findPerformanceMetricsById(
    id: number,
  ): Promise<PerformanceMetricsEntity> {
    const result = await this.performanceMetricsService.findOne({
      where: {
        id,
      },
    });
    if (!result) {
      throw new NotFoundException(`Not found`);
    }
    return result;
  }

  async updatePerformanceMetrics(dataUpdate, id: number) {
    const result = await this.findPerformanceMetricsById(id);
    return this.performanceMetricsService.save({
      ...result,
      ...dataUpdate,
    });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { PerformanceMetricsEntity } from './entities/performance_metrics.entity';
import { PerformanceMetricsController } from './performance_metrics.controller';
import { PerformanceMetricsService } from './performance_metrics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformanceMetricsEntity]),
    CustomersModule,
  ],
  providers: [PerformanceMetricsService],
  controllers: [PerformanceMetricsController],
})
export class PerformanceMetricsModule {}

import { MetricsEntity } from '../entities/metrics.entity';

export class ReturnMetricDto {
  id: number;
  customerId: number;
  title: string;
  type: string;
  module: string;
  chartData: object[];
  view: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(metric: MetricsEntity) {
    this.id = metric.id;
    this.customerId = metric.customerId;
    this.title = metric.title;
    this.type = metric.type;
    this.module = metric.module;
    this.chartData = metric.chartData
      ? metric.chartData.map((metric) => metric)
      : undefined;
    this.view = metric.view;
    this.createdAt = metric.createdAt;
    this.updatedAt = metric.updatedAt;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { PerformanceMetricsService } from './performance_metrics.service';

@Controller('performance-metrics')
export class PerformanceMetricsController {
  constructor(
    private readonly performanceMetricsService: PerformanceMetricsService,
  ) {}

  @Roles(UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async creatPerformanceMetrics(@Body() payload) {
    return this.performanceMetricsService.creatPerformanceMetrics(payload);
  }

  @Roles(UserType.Admin)
  @Get('/:customerId')
  async getPerformanceMetricsByCustomerId(
    @Param('customerId') customerId: number,
  ) {
    return await this.performanceMetricsService.getPerformanceMetricsByCustomerId(
      customerId,
    );
  }

  @Roles(UserType.Admin)
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePerformanceMetrics(@Body() dataUpdate, @Param('id') id: number) {
    return this.performanceMetricsService.updatePerformanceMetrics(
      dataUpdate,
      id,
    );
  }
}

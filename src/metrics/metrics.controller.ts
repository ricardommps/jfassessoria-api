import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateMetricsDto } from './dtos/createMetrics.dto';
import { ReturnMetricDto } from './dtos/returnMetrics.dto';
import { MetricsEntity } from './entities/metrics.entity';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get('/performance/:id/:startDate/:endDate/:module')
  async findPerformanceMetrics(
    @Param('id') id: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Param('module') module: string,
  ) {
    return await this.metricsService.findPerformanceMetrics(
      id,
      startDate,
      endDate,
      module,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/physiological/:id/:startDate/:endDate')
  async getDataMetricsPhysiological(
    @Param('id') id: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return await this.metricsService.getDataMetricsPhysiological(
      id,
      startDate,
      endDate,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/find/:customerId')
  async findMetricsByCustomerId(
    @Param('customerId') customerId,
  ): Promise<ReturnMetricDto[]> {
    return (await this.metricsService.findMetricsByCustomerId(customerId)).map(
      (metric) => new ReturnMetricDto(metric),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/myMetrics')
  async getAllMetrics(@UserId() userId: number): Promise<ReturnMetricDto[]> {
    return (await this.metricsService.findMetricsByCustomerId(userId)).map(
      (metric) => new ReturnMetricDto(metric),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post()
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() createMetricsDto: CreateMetricsDto,
  ): Promise<MetricsEntity> {
    return this.metricsService.createMetrics(createMetricsDto);
  }
}

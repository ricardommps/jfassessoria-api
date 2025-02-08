import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { LogEntity } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logEntity: Repository<LogEntity>,
    private readonly customersService: CustomersService,
  ) {}

  async createLog(logPaylod, userId) {
    const customer = await this.customersService.findCustomerById(userId);
    return this.logEntity.save({
      customerId: customer.id,
      ...logPaylod,
    });
  }
}

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

  async getLogs() {
    const logs = await this.logEntity.find({
      order: { createdAt: 'DESC' },
    });

    const logsParsed = logs.map((log) => ({
      ...log,
      errorMessage: (() => {
        try {
          return JSON.parse(log.errorMessage);
        } catch (error) {
          return log.errorMessage; // Retorna a string original se não for JSON válido
        }
      })(),
    }));

    return logsParsed;
  }
}

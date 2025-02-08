import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { LogEntity } from './entities/log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity]), CustomersModule],
  providers: [LogService],
  controllers: [LogController],
})
export class LogModule {}

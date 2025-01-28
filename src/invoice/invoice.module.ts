import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity]), CustomersModule],
  providers: [InvoiceService],
  controllers: [InvoiceController],
  exports: [InvoiceService],
})
export class InvoiceModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceEntity: Repository<InvoiceEntity>,
    private readonly customersService: CustomersService,
  ) {}

  async findInvoiceById(invoiceId: number): Promise<InvoiceEntity> {
    const notification = await this.invoiceEntity.findOne({
      where: {
        id: invoiceId,
      },
    });
    if (!notification) {
      throw new NotFoundException(`Notification id: ${invoiceId} not found`);
    }
    return notification;
  }

  async createInvoice(invoice) {
    await this.customersService.findCustomerById(invoice.customerId);
    return this.invoiceEntity.save({
      ...invoice,
    });
  }

  async getInvoiceAllByCustomerId(customerId: number) {
    const programs = await this.invoiceEntity.find({
      where: {
        customerId,
      },
      order: { createdAt: 'DESC' },
    });

    return programs;
  }

  async getMyInvoices(customerId: number): Promise<InvoiceEntity[]> {
    const invoices = await this.invoiceEntity.find({
      where: {
        customerId,
        status: 'paid',
      },
      order: { updatedAt: 'DESC' },
    });

    return invoices;
  }

  async deleteInvoice(invoiceId: number) {
    await this.findInvoiceById(invoiceId);

    return this.invoiceEntity.delete({ id: invoiceId });
  }

  async updateInvoice(invoiceUpdate, invoiceId: number) {
    const invoice = await this.findInvoiceById(invoiceId);
    return this.invoiceEntity.save({
      ...invoice,
      ...invoiceUpdate,
    });
  }
}

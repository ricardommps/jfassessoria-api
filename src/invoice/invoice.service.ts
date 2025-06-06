import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { In, Repository } from 'typeorm';
import { InvoiceEntity } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceEntity: Repository<InvoiceEntity>,
    private readonly customersService: CustomersService,
  ) {}

  async checkOverdueInvoices(customerId: number) {
    const today = new Date();

    // Fetch all invoices for the customer
    const invoices = await this.invoiceEntity.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });

    // Filter overdue invoices (status !== 'paid' and dueDate < today)
    const overdueInvoices = invoices.filter(
      (invoice) => invoice.status !== 'paid' && invoice.dueDate < today,
    );

    if (overdueInvoices.length > 0) {
      // Update the status of overdue invoices to "overdue"
      await Promise.all(
        overdueInvoices.map(async (invoice) => {
          await this.invoiceEntity.update(invoice.id, { status: 'overdue' });
        }),
      );
    }

    // Fetch all invoices again to return the updated list
    const updatedInvoices = await this.invoiceEntity.find({
      where: { customerId },
    });

    return updatedInvoices;
  }

  async findInvoiceById(invoiceId: number): Promise<InvoiceEntity> {
    const invoice = await this.invoiceEntity.findOne({
      where: {
        id: invoiceId,
      },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice id: ${invoiceId} not found`);
    }
    return invoice;
  }

  async createInvoice(invoice) {
    await this.customersService.findCustomerById(invoice.customerId);
    return this.invoiceEntity.save({
      ...invoice,
    });
  }

  async getInvoiceAllByCustomerId(customerId: number) {
    const invoices = await this.checkOverdueInvoices(customerId);
    // const invoice = await this.invoiceEntity.find({
    //   where: {
    //     customerId,
    //   },
    //   order: { createdAt: 'DESC' },
    // });

    return invoices;
  }

  async getInvoiceAllPaindByCustomerId(customerId: number) {
    const invoice = await this.invoiceEntity.find({
      where: {
        customerId,
        status: In(['paid', 'pending', 'overdue']),
      },
      order: { createdAt: 'DESC' },
    });

    return invoice;
  }

  async getInvoiceIdByCustomerId(invoiceId: number, customerId: number) {
    const invoice = await this.findInvoiceById(invoiceId);
    if (invoice.customerId !== customerId) {
      throw new UnauthorizedException();
    }
    return invoice;
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

  async verificaInvoicesVencidos(customerId: number) {
    const invoices = await this.invoiceEntity.find({
      where: {
        customerId,
      },
    });
  }

  async getTotalPaidInvoices(customerId: number) {
    const invoices = await this.checkOverdueInvoices(customerId);

    const filterResult = invoices.filter(
      (item) => item.status === 'paid' || item.status === 'pending',
    );

    const totalOverdue = invoices.filter((item) => item.status === 'overdue');
    return {
      totalPaid: filterResult?.length || 0,
      totalOverdue: totalOverdue?.length || 0,
    };
  }

  async getTotalPaidInvoices_(customerId: number) {
    const result = await this.invoiceEntity
      .createQueryBuilder('invoice')
      .select('COUNT(invoice.id)', 'count')
      .where('invoice.customerId = :customerId', { customerId })
      .andWhere('invoice.status IN (:...statuses)', {
        statuses: ['paid', 'pending'],
      })
      .getRawOne();
    return {
      totalPaid: result?.count ? parseInt(result.count, 10) : 0,
    };
  }
}

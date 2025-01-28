import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Roles(UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async createProgram(@Body() invoice) {
    return this.invoiceService.createInvoice(invoice);
  }

  @Roles(UserType.Admin)
  @Get('/all/:customerId')
  async getNotificationByCustomerId(@Param('customerId') customerId: number) {
    return await this.invoiceService.getInvoiceAllByCustomerId(customerId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:id')
  async deleteInvoice(@Param('id') id: string) {
    return this.invoiceService.deleteInvoice(+id);
  }

  @Roles(UserType.Admin)
  @Put('/:invoiceId')
  @UsePipes(ValidationPipe)
  async updateInvoice(
    @Body() invoiceUpdate,
    @Param('invoiceId') invoiceId: number,
  ) {
    return this.invoiceService.updateInvoice(invoiceUpdate, invoiceId);
  }
}

//invoiceNumber
//createDate
//dueDate
//status  - 'paid', 'pending', 'overdue', 'draft'
//description
//totalAmount

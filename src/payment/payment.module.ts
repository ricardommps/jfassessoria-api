import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

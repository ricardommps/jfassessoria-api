import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { UserModule } from 'src/user/user.module';
import { AnamneseController } from './anamnese.controller';
import { AnamneseService } from './anamnese.service';
import { AnamnesisEntity } from './entities/anamnese.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnamnesisEntity]),
    CustomersModule,
    forwardRef(() => UserModule),
  ],
  providers: [AnamneseService],
  controllers: [AnamneseController],
  exports: [AnamneseService],
})
export class AnamneseModule {}

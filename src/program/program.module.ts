import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from './entities/program.entity';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { CustomersModule } from '../customers/customers.module';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity]),
    CustomersModule,
    forwardRef(() => TrainingModule),
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports: [ProgramService],
})
export class ProgramModule {}

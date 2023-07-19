import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { ProgramEntity } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { TrainingEntity } from 'src/training/entities/training.entity';
import { TrainingService } from 'src/training/training.service';
import { CreateTrainingDto } from 'src/training/dtos/createTraining.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    private readonly customersService: CustomersService,

    @Inject(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,
  ) {}

  async getAllProgram(): Promise<ProgramEntity[]> {
    return this.programRepository.find();
  }

  async createProgram(
    createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    await this.customersService.findCustomerById(createProgramDto.customerId);
    return this.programRepository.save({
      ...createProgramDto,
    });
  }

  async cloneProgram(
    createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    await this.customersService.findCustomerById(createProgramDto.customerId);
    const program = await this.programRepository.save({
      ...createProgramDto,
    });

    return program;
  }

  async findProgramByCustomerId(customerId: number): Promise<ProgramEntity[]> {
    const programs = await this.programRepository.find({
      where: {
        customerId,
      },
      order: { createdAt: 'ASC' },
    });

    return programs;
  }

  async findProgramById(programId: number): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: {
        id: programId,
      },
    });
    if (!program) {
      throw new NotFoundException(`Program id: ${programId} not found`);
    }
    return program;
  }

  async findProgramByIdUsingRelation(
    programId: number,
  ): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: {
        id: programId,
      },
      relations: {
        trainings: true,
      },
    });
    if (!program) {
      throw new NotFoundException(`Program id: ${programId} not found`);
    }
    return program;
  }

  async updateProgram(
    updateProgram: UpdateProgramDto,
    programId: number,
  ): Promise<ProgramEntity> {
    const product = await this.findProgramById(programId);

    return this.programRepository.save({
      ...product,
      ...updateProgram,
    });
  }

  private async preloadTraining(
    training: CreateTrainingDto,
    programId: number,
  ): Promise<TrainingEntity> {
    const trainingCreated = await this.trainingService.cloneTraining(
      training,
      programId,
    );

    if (trainingCreated) {
      return trainingCreated;
    }
  }
}

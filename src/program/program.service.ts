import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { TrainingService } from '../training/training.service';
import { CloneProgramDto } from './dtos/cloneProgram.dto';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { SendProgramDto } from './dtos/sendProgram.dto';
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { ProgramEntity } from './entities/program.entity';
//Program
export interface SendSuccess {
  status: number;
  message: string;
}

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    private readonly customersService: CustomersService,

    @Inject(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getAllProgram(): Promise<ProgramEntity[]> {
    return this.programRepository.find({
      where: {
        hide: false,
      },
      relations: {
        customer: true,
      },
    });
  }

  async getAllProgramChart(): Promise<ProgramEntity[]> {
    return this.programRepository.find();
  }

  async createProgram(
    createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    const newCreateProgramDto = createProgramDto;
    newCreateProgramDto.hide = false;
    await this.customersService.findCustomerById(
      newCreateProgramDto.customerId,
    );
    return this.programRepository.save({
      ...newCreateProgramDto,
    });
  }

  async cloneProgram(cloneProgramDto: CloneProgramDto): Promise<ProgramEntity> {
    await this.customersService.findCustomerById(cloneProgramDto.customerId);
    const program = await this.programRepository.save({
      ...cloneProgramDto,
    });

    return program;
  }

  async sendProgram(sendProgramDto: SendProgramDto): Promise<SendSuccess> {
    await sendProgramDto.customersId.map(async (item) => {
      const saveProgram = {
        ...sendProgramDto,
        customerId: item,
      };
      delete saveProgram.customersId;
      await this.customersService.findCustomerById(saveProgram.customerId);
      return this.programRepository.save({
        ...saveProgram,
      });
    });
    return {
      status: 200,
      message: 'Send Success',
    };
  }

  async findProgramByCustomerId(customerId: number): Promise<ProgramEntity[]> {
    const programs = await this.programRepository.find({
      where: {
        customerId,
        hide: false,
      },
      relations: {
        trainings: true,
      },
      order: { referenceMonth: 'DESC' },
    });

    return programs;
  }

  async findArchivedProgramByCustomerId(
    customerId: number,
  ): Promise<ProgramEntity[]> {
    const programs = await this.programRepository.find({
      where: {
        customerId,
        hide: true,
      },
      relations: ['customer', 'trainings '],
      order: { createdAt: 'ASC' },
    });

    return programs;
  }

  async findArchivedProgramByCustomerIdQuery(customerId) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['pro.*', 'c.id', 'c.user_id', 'c.name AS customerName'])
      .from(ProgramEntity, 'pro')
      .leftJoin(CustomerEntity, 'c', 'pro.customer_id = c.id')
      .leftJoin(TrainingEntity, 'tra', 'tra.program_id = pro.id')
      .where('pro.customer_id= :customerId', { customerId: customerId })
      .andWhere('pro.hide= :hide', { hide: true })
      .orderBy('pro.created_at', 'ASC');
    const programs = await qb.getRawMany();
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

  async findMyProgramByIdUsingRelation(
    programId: number,
    customerId: number,
  ): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: {
        id: programId,
        customerId,
      },
    });
    if (!program) {
      throw new NotFoundException(`Program id: ${programId} not found`);
    }
    return program;
  }

  async findProgramByIdUViewPdf(programId: number): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: {
        id: programId,
        trainings: {
          published: true,
          // id: Not(IsNull()), // parent (not)exist - this can helpful for someone
        },
      },
      relations: {
        trainings: true,
        customer: true,
      },
      order: {
        trainings: {
          datePublished: 'ASC',
        },
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
    const program = await this.findProgramById(programId);

    return this.programRepository.save({
      ...program,
      ...updateProgram,
    });
  }

  async deleteProgram(programId: number): Promise<DeleteResult> {
    await this.findProgramById(programId);

    return this.programRepository.delete({ id: programId });
  }

  async hideProgram(programId: number): Promise<ProgramEntity> {
    const program = await this.findProgramById(programId);
    program.hide = true;
    return this.programRepository.save({
      ...program,
    });
  }

  async showProgram(programId: number): Promise<ProgramEntity> {
    const program = await this.findProgramById(programId);
    program.hide = false;
    return this.programRepository.save({
      ...program,
    });
  }
}

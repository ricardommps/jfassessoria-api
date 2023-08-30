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
import { ProgramService, SendSuccess } from './program.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProgramDto } from './dtos/returnProgram.dto';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { ProgramEntity } from './entities/program.entity';
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { CloneProgramDto } from './dtos/cloneProgram.dto';
import { SendProgramDto } from './dtos/sendProgram.dto';
import { ReturnProgramAndCustomerDto } from './dtos/returnProgramAndCustomer.dto';
import { DeleteResult } from 'typeorm';
import { ArchivedProgramDto } from './dtos/archivedProgram.dto';

@Roles(UserType.Admin, UserType.Root)
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}
  @Get()
  async getAllProgram(): Promise<ReturnProgramDto[]> {
    return (await this.programService.getAllProgram()).map(
      (programEntity) => new ReturnProgramAndCustomerDto(programEntity),
    );
  }

  @Get('/allChart')
  async getAllProgramChart(): Promise<ReturnProgramDto[]> {
    return (await this.programService.getAllProgramChart()).map(
      (programEntity) => new ReturnProgramAndCustomerDto(programEntity),
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    return this.programService.createProgram(createProgramDto);
  }

  @Post('/clone')
  @UsePipes(ValidationPipe)
  async clone(
    @Body() cloneProgramDto: CloneProgramDto,
  ): Promise<ProgramEntity> {
    return this.programService.cloneProgram(cloneProgramDto);
  }

  @Post('/sendProgram')
  @UsePipes(ValidationPipe)
  async sendProgram(
    @Body() sendProgramDto: SendProgramDto,
  ): Promise<SendSuccess> {
    return this.programService.sendProgram(sendProgramDto);
  }

  @Get('/customer/:customerId')
  async findProgramByCustomerId(
    @Param('customerId') customerId,
  ): Promise<ReturnProgramDto[]> {
    return (await this.programService.findProgramByCustomerId(customerId)).map(
      (program) => new ReturnProgramDto(program),
    );
  }

  @Get('/:programId')
  async findProgramById(
    @Param('programId') programId,
  ): Promise<ReturnProgramDto> {
    return await this.programService.findProgramById(programId);
  }

  @Get('/detail/:programId')
  async findProgramByIdUsingRelation(
    @Param('programId') programId,
  ): Promise<ReturnProgramDto> {
    return await this.programService.findProgramByIdUsingRelation(programId);
  }

  @Get('/viewPdf/:programId')
  async findProgramByIdUViewPdf(
    @Param('programId') programId,
  ): Promise<ReturnProgramAndCustomerDto> {
    return await this.programService.findProgramByIdUViewPdf(programId);
  }

  @UsePipes(ValidationPipe)
  @Put('/:programId')
  async updateProgram(
    @Body() updateProgram: UpdateProgramDto,
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.updateProgram(updateProgram, programId);
  }

  @Delete('/:programId')
  async deleteProgram(
    @Param('programId') programId: number,
  ): Promise<DeleteResult> {
    return this.programService.deleteProgram(programId);
  }

  @UsePipes(ValidationPipe)
  @Put('/hide/:programId')
  async hideProgram(
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.hideProgram(programId);
  }

  @UsePipes(ValidationPipe)
  @Put('/show/:programId')
  async showProgram(
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.showProgram(programId);
  }

  @Get('/archived/:customerId')
  async findArchivedProgramByCustomerId(
    @Param('customerId') customerId,
  ): Promise<ArchivedProgramDto[]> {
    return (
      await this.programService.findArchivedProgramByCustomerId(customerId)
    ).map((program) => new ArchivedProgramDto(program));
  }
}

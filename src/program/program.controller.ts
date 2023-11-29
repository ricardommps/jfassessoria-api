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
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CloneProgramDto } from './dtos/cloneProgram.dto';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { ReturnProgramDto } from './dtos/returnProgram.dto';
import { ReturnProgramAndCustomerDto } from './dtos/returnProgramAndCustomer.dto';
import { SendProgramDto } from './dtos/sendProgram.dto';
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { ProgramEntity } from './entities/program.entity';
import { ProgramService, SendSuccess } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/myPrograms')
  async getAllCustomer(@UserId() userId: number): Promise<ReturnProgramDto[]> {
    return (await this.programService.findProgramByCustomerId(userId)).map(
      (program) => new ReturnProgramDto(program),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/myProgram/:programId')
  async myProgramById(
    @UserId() userId: number,
    @Param('programId') programId,
  ): Promise<ReturnProgramDto> {
    return await this.programService.findMyProgramByIdUsingRelation(
      programId,
      userId,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getAllProgram(): Promise<ReturnProgramDto[]> {
    return (await this.programService.getAllProgram()).map(
      (programEntity) => new ReturnProgramAndCustomerDto(programEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/allChart')
  async getAllProgramChart(): Promise<ReturnProgramDto[]> {
    return (await this.programService.getAllProgramChart()).map(
      (programEntity) => new ReturnProgramAndCustomerDto(programEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post()
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    return this.programService.createProgram(createProgramDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/clone')
  @UsePipes(ValidationPipe)
  async clone(
    @Body() cloneProgramDto: CloneProgramDto,
  ): Promise<ProgramEntity> {
    return this.programService.cloneProgram(cloneProgramDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/sendProgram')
  @UsePipes(ValidationPipe)
  async sendProgram(
    @Body() sendProgramDto: SendProgramDto,
  ): Promise<SendSuccess> {
    return this.programService.sendProgram(sendProgramDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/customer/:customerId')
  async findProgramByCustomerId(
    @Param('customerId') customerId,
  ): Promise<ReturnProgramDto[]> {
    return (await this.programService.findProgramByCustomerId(customerId)).map(
      (program) => new ReturnProgramDto(program),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:programId')
  async findProgramById(
    @Param('programId') programId,
  ): Promise<ReturnProgramDto> {
    return await this.programService.findProgramById(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/detail/:programId')
  async findProgramByIdUsingRelation(
    @Param('programId') programId,
  ): Promise<ReturnProgramDto> {
    return await this.programService.findProgramByIdUsingRelation(programId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/viewPdf/:programId')
  async findProgramByIdUViewPdf(
    @Param('programId') programId,
  ): Promise<ReturnProgramAndCustomerDto> {
    return await this.programService.findProgramByIdUViewPdf(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/:programId')
  @UsePipes(ValidationPipe)
  async updateProgram(
    @Body() updateProgram: UpdateProgramDto,
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.updateProgram(updateProgram, programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:programId')
  async deleteProgram(
    @Param('programId') programId: number,
  ): Promise<DeleteResult> {
    return this.programService.deleteProgram(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/hide/:programId')
  @UsePipes(ValidationPipe)
  async hideProgram(
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.hideProgram(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/show/:programId')
  @UsePipes(ValidationPipe)
  async showProgram(
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.showProgram(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/archived/:customerId')
  async findArchivedProgramByCustomerId(@Param('customerId') customerId) {
    return await this.programService.findArchivedProgramByCustomerIdQuery(
      customerId,
    );
  }
}

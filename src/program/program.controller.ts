import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProgramDto } from './dtos/returnProgram.dto';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { ProgramEntity } from './entities/program.entity';
import { UpdateProgramDto } from './dtos/updateProgram.dto';

@Roles(UserType.Admin, UserType.Root)
@Controller('api/v2/program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}
  @Get()
  async getAllProgram(): Promise<ReturnProgramDto[]> {
    return (await this.programService.getAllProgram()).map(
      (programEntity) => new ReturnProgramDto(programEntity),
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
    @Body() createProgramDto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    return this.programService.cloneProgram(createProgramDto);
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

  @UsePipes(ValidationPipe)
  @Put('/:programId')
  async updateProduct(
    @Body() updateProgram: UpdateProgramDto,
    @Param('programId') programId: number,
  ): Promise<ProgramEntity> {
    return this.programService.updateProgram(updateProgram, programId);
  }
}

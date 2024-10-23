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
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AnamneseService } from './anamnese.service';

@Controller('anamnese')
export class AnamneseController {
  constructor(private readonly anamneseService: AnamneseService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async createAnamnese(@Body() anamnese) {
    return await this.anamneseService.createAnamnese(anamnese);
  }

  @Roles(UserType.Admin)
  @Get('/:customerId')
  async getUserById(
    @Param('customerId') customerId: number,
    @UserId() userId: number,
  ) {
    return await this.anamneseService.listAnamnese(customerId, userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/:anamneseId')
  @UsePipes(ValidationPipe)
  async readAnamnese(@Param('anamneseId') anamneseId: number) {
    return this.anamneseService.readAnamnese(anamneseId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @UsePipes(ValidationPipe)
  @Post('/registeredUser')
  async createAnamneseRegisteredUser(
    @Body() payload,
    @UserId() userId: number,
  ) {
    return this.anamneseService.createAnamneseRegisteredUser(
      payload.customer,
      payload.anamnese,
      userId,
    );
  }
}

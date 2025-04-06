import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('activate')
  activateAccount(@Query() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.getUserById(id);
  }
}

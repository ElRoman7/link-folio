import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/users/interfaces/valid-roles';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Auth(ValidRoles.user)
  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @GetUser() user: User) {
    return this.linksService.create(createLinkDto, user);
  }

  @Auth(ValidRoles.user)
  @Get()
  findAll(@GetUser() user: User) {
    return this.linksService.findAll(user.id);
  }

  @Auth(ValidRoles.user)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.linksService.findOne(id, user.id);
  }

  @Auth(ValidRoles.user)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @GetUser() user: User,
  ) {
    return this.linksService.update(id, updateLinkDto, user.id);
  }

  @Auth(ValidRoles.user)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.linksService.remove(id, user.id);
  }
}

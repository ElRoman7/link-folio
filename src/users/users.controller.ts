import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LinksService } from 'src/links/links.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly linkService: LinksService,
    @InjectQueue('visits') private readonly visitQueue: Queue,
  ) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('activate')
  activateAccount(@Query() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }

  // Endpoint para mostrar el perfil público de un usuario
  @Get(':username')
  async getPublicProfile(
    @Param('username') username: string,
    @Req() req: Request,
  ) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const links = await this.linkService.findByUser(user.id);

    // Registrar la visita al perfil del usuario (no a un link específico)
    await this.visitQueue.add('track', {
      linkId: null, // Visita al perfil, no un enlace específico
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return {
      username: user.username,
      bio: user.bio,
      links,
    };
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.getUserById(id);
  }
}

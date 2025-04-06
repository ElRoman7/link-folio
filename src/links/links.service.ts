import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { ErrorHandlerService } from 'src/common/error-handler.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async create(createLinkDto: CreateLinkDto, user: User) {
    try {
      const link = this.linkRepository.create({
        ...createLinkDto,
        user: { id: user.id },
      });
      return this.linkRepository.save(link);
    } catch (error) {
      this.errorHandlerService.handleDBException(error);
    }
  }

  async findAll(userId: string) {
    return this.linkRepository.find({
      where: { user: { id: userId } },
      order: { order: 'ASC' },
    });
  }

  async findByUser(userId: string) {
    const links = await this.linkRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!links.length) {
      throw new NotFoundException('Link Not Found');
    }
    return links;
  }

  async findOne(id: string, userId: string) {
    const link = this.linkRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
    if (!link) {
      throw new NotFoundException('Link Not Found');
    }
    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto, userId: string) {
    const link = await this.linkRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!link) throw new NotFoundException('Link not found');
    Object.assign(link, updateLinkDto);
    return this.linkRepository.save(link);
  }

  async remove(id: string, userId: string) {
    const link = await this.linkRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!link) throw new NotFoundException('Link not found');
    return this.linkRepository.remove(link);
  }
}

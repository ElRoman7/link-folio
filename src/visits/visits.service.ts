import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './entities/visit.entity';
import { CreateVisitDto } from './dto/create-visit.dto';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
  ) {}

  async create(dto: CreateVisitDto) {
    const visit = this.visitRepository.create({
      ipAddress: dto.ipAddress,
      userAgent: dto.userAgent,
      link: { id: dto.linkId },
    });
    return this.visitRepository.save(visit);
  }

  async findByLink(linkId: string) {
    return this.visitRepository.find({
      where: { link: { id: linkId } },
      order: { timestamp: 'DESC' },
    });
  }
}

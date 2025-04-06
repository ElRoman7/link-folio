import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { VisitService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('visits')
export class VisitController {
  constructor(
    private readonly visitService: VisitService,
    @InjectQueue('visits') private readonly visitQueue: Queue,
  ) {}

  @Post()
  async trackVisit(@Body() dto: CreateVisitDto) {
    await this.visitQueue.add('track', dto, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 3000 },
    });
    return { status: 'Visit queued for tracking' };
  }

  @Get()
  async getByLink(@Query('linkId') linkId: string) {
    return this.visitService.findByLink(linkId);
  }
}
